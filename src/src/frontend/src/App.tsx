import { useEffect } from "react";
import {
  RouterProvider,
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "./hooks/useQueries";
import { UserProfileSetup } from "./components/UserProfileSetup";
import { Toaster } from "./components/ui/sonner";
import { HomePage } from "./pages/HomePage";
import { GameDetailPage } from "./pages/GameDetailPage";
import { AdminDashboardPage } from "./pages/AdminDashboardPage";
import { AdminGameFormPage } from "./pages/AdminGameFormPage";

// Root layout component with user profile check
function RootLayout() {
  const { identity, isInitializing } = useInternetIdentity();
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();

  const isAuthenticated = !!identity;
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <Outlet />
      <UserProfileSetup open={showProfileSetup} />
      <Toaster />
    </>
  );
}

// Root route with user profile check
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Public routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const gameDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/game/$gameId",
  component: GameDetailPage,
});

// Admin routes
const adminDashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/dashboard",
  component: AdminDashboardPage,
});

const adminGameNewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/game/new",
  component: AdminGameFormPage,
});

const adminGameEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/game/$gameId",
  component: AdminGameFormPage,
});

// Create route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  gameDetailRoute,
  adminDashboardRoute,
  adminGameNewRoute,
  adminGameEditRoute,
]);

// Create router
const router = createRouter({ routeTree });

// Type declaration for router
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
