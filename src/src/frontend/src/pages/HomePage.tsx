import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { AboutSection } from "../components/AboutSection";
import { TrustSection } from "../components/TrustSection";
import { GameGrid } from "../components/GameGrid";
import { useGetAllGames } from "../hooks/useQueries";
import { Loader2 } from "lucide-react";

export function HomePage() {
  const { data: games, isLoading, error } = useGetAllGames();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        <AboutSection />
        
        <section className="container mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold mb-6">Available Games</h2>
          
          {isLoading && (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          )}
          
          {error && (
            <div className="text-center py-12 text-destructive">
              Failed to load games. Please try again later.
            </div>
          )}
          
          {games && <GameGrid games={games} />}
        </section>

        <TrustSection />
      </main>
      
      <Footer />
    </div>
  );
}
