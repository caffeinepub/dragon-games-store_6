import { useState, useEffect } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { useGetAllGames, useDeleteGame, useIsCallerAdmin } from "../hooks/useQueries";
import { PlatformIcons } from "../components/PlatformIcons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { Button } from "../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Badge } from "../components/ui/badge";
import { Loader2, Plus, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: games, isLoading } = useGetAllGames();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsCallerAdmin();
  const deleteGame = useDeleteGame();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [gameToDelete, setGameToDelete] = useState<string | null>(null);

  // Redirect if not admin
  useEffect(() => {
    if (!isAdminLoading && !isAdmin) {
      navigate({ to: "/" });
    }
  }, [isAdminLoading, isAdmin, navigate]);

  const handleDeleteClick = (id: string) => {
    setGameToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!gameToDelete) return;

    try {
      await deleteGame.mutateAsync(gameToDelete);
      toast.success("Game deleted successfully");
      setDeleteDialogOpen(false);
      setGameToDelete(null);
    } catch (error) {
      toast.error("Failed to delete game");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <Button asChild>
            <Link to="/admin/game/new">
              <Plus className="mr-2 h-4 w-4" />
              Add New Game
            </Link>
          </Button>
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {games && games.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No games yet. Click "Add New Game" to get started.
          </div>
        )}

        {games && games.length > 0 && (
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Poster</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Platforms</TableHead>
                  <TableHead>Sale</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {games.map((game) => (
                  <TableRow key={game.id}>
                    <TableCell>
                      <img
                        src={game.posterBlob.getDirectURL()}
                        alt={game.name}
                        className="w-16 h-20 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{game.name}</TableCell>
                    <TableCell className="font-semibold">
                      ₹{Number(game.price)}
                    </TableCell>
                    <TableCell>
                      <PlatformIcons platforms={game.platforms} size="sm" />
                    </TableCell>
                    <TableCell>
                      {game.onSale ? (
                        <Badge className="bg-primary text-primary-foreground">
                          ON SALE
                        </Badge>
                      ) : (
                        <Badge variant="outline">No</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                        >
                          <Link
                            to="/admin/game/$gameId"
                            params={{ gameId: game.id }}
                          >
                            <Pencil className="h-4 w-4" />
                          </Link>
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteClick(game.id)}
                          disabled={deleteGame.isPending}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </main>
      
      <Footer />

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Game</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this game? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteGame.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteGame.isPending}
            >
              {deleteGame.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
