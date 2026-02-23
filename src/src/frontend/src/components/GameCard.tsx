import { Link } from "@tanstack/react-router";
import type { Game } from "../backend.d";
import { PlatformIcons } from "./PlatformIcons";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface GameCardProps {
  game: Game;
}

export function GameCard({ game }: GameCardProps) {
  const posterUrl = game.posterBlob.getDirectURL();
  const priceStr = `₹${Number(game.price)}`;
  const whatsappUrl = `https://wa.me/918757242995?text=${encodeURIComponent(
    `Hi, I want to buy ${game.name} for ${priceStr}`
  )}`;

  return (
    <Card className="group relative shrink-0 w-[280px] overflow-hidden bg-card border-border hover:shadow-lg transition-shadow">
      <Link to="/game/$gameId" params={{ gameId: game.id }} className="block">
        <div className="relative aspect-[3/4] overflow-hidden">
          <img
            src={posterUrl}
            alt={game.name}
            className="w-full h-full object-cover transition-transform group-hover:scale-105"
          />
          
          {/* Sale Badge */}
          {game.onSale && (
            <div className="absolute top-3 left-3 bg-primary text-primary-foreground px-3 py-1.5 rounded font-bold text-sm shadow-md">
              SALE!
            </div>
          )}
          
          {/* Price Tag */}
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-4 py-2 rounded font-bold text-lg shadow-md">
            {priceStr}
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link to="/game/$gameId" params={{ gameId: game.id }}>
          <h3 className="font-semibold text-lg line-clamp-1 hover:text-primary transition-colors">
            {game.name}
          </h3>
        </Link>

        <PlatformIcons platforms={game.platforms} size="md" />

        <Button
          asChild
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-base h-11"
        >
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
            Buy Now
          </a>
        </Button>
      </div>
    </Card>
  );
}
