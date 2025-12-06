import {
  Router,
  RouterProvider,
  createRoute,
  createRootRoute,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import React from "react";
import About from "./pages/About";
import { useAuth } from "./useAuth";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import IndexRedirect from "./IndexRedirect";
import Login from "./pages/Login";

const Protected: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) {
      router.navigate({ to: "/login" });
    }
  }, [user, router]);

  if (!user) return null;

  return <>{children}</>;
};

const rootRoute = createRootRoute({
  component: () => (
    <div>
      <Outlet />
    </div>
  ),
  notFoundComponent: () => (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>404 - Page Not Found</h1>
      <p>Invalid URL</p>
    </div>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: IndexRedirect,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: () => (
    <Protected>
      <Dashboard />
    </Protected>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: About,
});

const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: () => (
    <Protected>
      <Profile />
    </Protected>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  dashboardRoute,
  aboutRoute,
  profileRoute,
]);

// eslint-disable-next-line react-refresh/only-export-components
export const router = new Router({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export function AppRouter() {
  return <RouterProvider router={router} />;
}
