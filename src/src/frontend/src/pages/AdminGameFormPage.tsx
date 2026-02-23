import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import {
  useGetGameById,
  useCreateGame,
  useUpdateGame,
  useIsCallerAdmin,
} from "../hooks/useQueries";
import { Platform } from "../backend.d";
import { ExternalBlob } from "../backend";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Checkbox } from "../components/ui/checkbox";
import { Loader2, ArrowLeft, Upload } from "lucide-react";
import { toast } from "sonner";

export function AdminGameFormPage() {
  const navigate = useNavigate();
  const params = useParams({ strict: false });
  const gameId = (params as any).gameId as string | undefined;
  const isEditMode = gameId && gameId !== "new";

  const { data: game, isLoading: gameLoading } = useGetGameById(gameId || "");
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const createGame = useCreateGame();
  const updateGame = useUpdateGame();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [trailerUrl, setTrailerUrl] = useState("");
  const [platforms, setPlatforms] = useState<Platform[]>([]);
  const [onSale, setOnSale] = useState(false);
  const [posterFile, setPosterFile] = useState<File | null>(null);
  const [posterPreview, setPosterPreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  // Load existing game data in edit mode
  useEffect(() => {
    if (isEditMode && game) {
      setName(game.name);
      setPrice(Number(game.price).toString());
      setTrailerUrl(game.trailerUrl);
      setPlatforms(game.platforms);
      setOnSale(game.onSale);
      setPosterPreview(game.posterBlob.getDirectURL());
    }
  }, [isEditMode, game]);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdminLoading && !isAdmin) {
      navigate({ to: "/" });
    }
  }, [isAdminLoading, isAdmin, navigate]);

  const handlePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPosterFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPosterPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePlatformToggle = (platform: Platform) => {
    setPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !price || platforms.length === 0 || !trailerUrl.trim()) {
      toast.error("Please fill all required fields");
      return;
    }

    if (!isEditMode && !posterFile) {
      toast.error("Please upload a poster image");
      return;
    }

    try {
      if (isEditMode && gameId && game) {
        // Edit mode - use existing poster if no new file uploaded
        let posterBlob;
        
        if (posterFile) {
          const arrayBuffer = await posterFile.arrayBuffer();
          const uint8Array = new Uint8Array(arrayBuffer);
          posterBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
            (percentage) => setUploadProgress(percentage)
          );
        } else {
          // Keep the existing poster - type cast to any to bypass structural typing issue
          posterBlob = game.posterBlob as any;
        }

        await updateGame.mutateAsync({
          id: gameId,
          name: name.trim(),
          posterBlob,
          price: BigInt(price),
          trailerUrl: trailerUrl.trim(),
          platforms,
          onSale,
        });
        toast.success("Game updated successfully");
      } else {
        // Create mode - require poster file
        if (!posterFile) {
          toast.error("Poster image is required");
          return;
        }

        const arrayBuffer = await posterFile.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        const posterBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress(
          (percentage) => setUploadProgress(percentage)
        );

        await createGame.mutateAsync({
          name: name.trim(),
          posterBlob,
          price: BigInt(price),
          trailerUrl: trailerUrl.trim(),
          platforms,
          onSale,
        });
        toast.success("Game created successfully");
      }

      navigate({ to: "/admin/dashboard" });
    } catch (error) {
      console.error("Failed to save game:", error);
      toast.error("Failed to save game");
    }
  };

  const isSubmitting = createGame.isPending || updateGame.isPending;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/admin/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Link>
        </Button>

        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">
            {isEditMode ? "Edit Game" : "Add New Game"}
          </h1>

          {gameLoading && isEditMode && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}

          {(!isEditMode || game) && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Game Name */}
              <div className="space-y-2">
                <Label htmlFor="name">Game Name *</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter game name"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Poster Image */}
              <div className="space-y-2">
                <Label htmlFor="poster">Poster Image *</Label>
                <div className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Input
                      id="poster"
                      type="file"
                      accept="image/*"
                      onChange={handlePosterChange}
                      disabled={isSubmitting}
                      className="cursor-pointer"
                    />
                    {uploadProgress > 0 && uploadProgress < 100 && (
                      <div className="mt-2 text-sm text-muted-foreground">
                        Upload progress: {uploadProgress}%
                      </div>
                    )}
                  </div>
                  {posterPreview && (
                    <img
                      src={posterPreview}
                      alt="Preview"
                      className="w-24 h-32 object-cover rounded border"
                    />
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="249"
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Trailer URL */}
              <div className="space-y-2">
                <Label htmlFor="trailerUrl">Trailer URL *</Label>
                <Input
                  id="trailerUrl"
                  type="url"
                  value={trailerUrl}
                  onChange={(e) => setTrailerUrl(e.target.value)}
                  placeholder="https://youtube.com/watch?v=..."
                  required
                  disabled={isSubmitting}
                />
              </div>

              {/* Platforms */}
              <div className="space-y-3">
                <Label>Platforms * (select at least one)</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="platform-pc"
                      checked={platforms.includes(Platform.pc)}
                      onCheckedChange={() => handlePlatformToggle(Platform.pc)}
                      disabled={isSubmitting}
                    />
                    <Label
                      htmlFor="platform-pc"
                      className="font-normal cursor-pointer"
                    >
                      PC
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="platform-xbox"
                      checked={platforms.includes(Platform.xbox)}
                      onCheckedChange={() =>
                        handlePlatformToggle(Platform.xbox)
                      }
                      disabled={isSubmitting}
                    />
                    <Label
                      htmlFor="platform-xbox"
                      className="font-normal cursor-pointer"
                    >
                      Xbox
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="platform-ps"
                      checked={platforms.includes(Platform.playstation)}
                      onCheckedChange={() =>
                        handlePlatformToggle(Platform.playstation)
                      }
                      disabled={isSubmitting}
                    />
                    <Label
                      htmlFor="platform-ps"
                      className="font-normal cursor-pointer"
                    >
                      PlayStation
                    </Label>
                  </div>
                </div>
              </div>

              {/* On Sale */}
              <div className="flex items-center space-x-2">
                <Switch
                  id="onSale"
                  checked={onSale}
                  onCheckedChange={setOnSale}
                  disabled={isSubmitting}
                />
                <Label htmlFor="onSale" className="font-normal cursor-pointer">
                  Mark as "On Sale"
                </Label>
              </div>

              {/* Submit Buttons */}
              <div className="flex gap-4">
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditMode ? "Update Game" : "Create Game"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate({ to: "/admin/dashboard" })}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
