import { useRef } from "react";
import type { Game } from "../backend.d";
import { GameCard } from "./GameCard";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GameGridProps {
  games: Game[];
}

export function GameGrid({ games }: GameGridProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollContainerRef.current) return;
    const scrollAmount = 300;
    const newScrollLeft =
      scrollContainerRef.current.scrollLeft +
      (direction === "right" ? scrollAmount : -scrollAmount);
    scrollContainerRef.current.scrollTo({
      left: newScrollLeft,
      behavior: "smooth",
    });
  };

  if (games.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No games available yet. Check back soon!
      </div>
    );
  }

  return (
    <div className="relative group">
      {/* Left Arrow */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-sm shadow-lg"
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {games.map((game) => (
          <GameCard key={game.id} game={game} />
        ))}
      </div>

      {/* Right Arrow */}
      <Button
        variant="outline"
        size="icon"
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 backdrop-blur-sm shadow-lg"
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
