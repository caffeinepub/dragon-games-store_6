import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background mt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <span>© 2026. Built with</span>
          <Heart className="w-4 h-4 fill-primary text-primary" />
          <span>using</span>
          <a
            href="https://caffeine.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
