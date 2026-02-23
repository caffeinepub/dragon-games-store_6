import { useParams, Link } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { PlatformIcons } from "../components/PlatformIcons";
import { useGetGameById } from "../hooks/useQueries";
import { Button } from "../components/ui/button";
import { Loader2, ArrowLeft } from "lucide-react";

export function GameDetailPage() {
  const { gameId } = useParams({ from: "/game/$gameId" });
  const { data: game, isLoading, error } = useGetGameById(gameId);

  const getEmbedUrl = (url: string) => {
    // Convert YouTube watch URL to embed URL
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("youtu.be/")) {
      const videoId = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <Button asChild variant="outline" className="mb-6">
          <Link to="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Store
          </Link>
        </Button>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div className="text-center py-12 text-destructive">
            Failed to load game details. Please try again later.
          </div>
        )}

        {game && (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
                <PlatformIcons platforms={game.platforms} size="lg" />
              </div>
              <div className="text-4xl font-bold text-primary">
                ₹{Number(game.price)}
              </div>
            </div>

            {game.onSale && (
              <div className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded font-bold">
                ON SALE!
              </div>
            )}

            {/* Trailer Video */}
            <div className="aspect-video w-full bg-muted rounded-lg overflow-hidden">
              <iframe
                src={getEmbedUrl(game.trailerUrl)}
                title={`${game.name} Trailer`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            {/* Buy Now Button */}
            <Button
              asChild
              size="lg"
              className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-xl h-14 px-12"
            >
              <a
                href={`https://wa.me/918757242995?text=${encodeURIComponent(
                  `Hi, I want to buy ${game.name} for ₹${Number(game.price)}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy Now on WhatsApp
              </a>
            </Button>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}
