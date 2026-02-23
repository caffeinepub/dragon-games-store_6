import { Link } from "@tanstack/react-router";
import { HeaderPlatformLogos } from "./PlatformIcons";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useIsCallerAdmin } from "../hooks/useQueries";
import { Button } from "./ui/button";

export function Header() {
  const { identity, login, clear } = useInternetIdentity();
  const { data: isAdmin } = useIsCallerAdmin();

  return (
    <header className="border-b border-border bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-8">
            <div className="text-3xl font-bold tracking-tight border-2 border-foreground px-4 py-2">
              DGS
            </div>
            <HeaderPlatformLogos className="hidden sm:flex" />
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center gap-3">
            {identity && isAdmin && (
              <Button asChild variant="outline">
                <Link to="/admin/dashboard">Admin Dashboard</Link>
              </Button>
            )}
            
            {identity ? (
              <Button onClick={clear} variant="default">
                Logout
              </Button>
            ) : (
              <Button onClick={login} variant="default">
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
