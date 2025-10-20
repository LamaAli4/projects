import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import Loading from "./components/loading";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-context";
import { RoutesSection } from "./router/section";
import { NotesProvider } from "./context/notes-context";
import { AuthProvider } from "./context/auth-context";

const router = createBrowserRouter(RoutesSection);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <NotesProvider>
        <AuthProvider>
          <Suspense fallback={<Loading />}>
            <RouterProvider router={router} />
          </Suspense>
        </AuthProvider>
      </NotesProvider>
    </ThemeProvider>
  </React.StrictMode>
);
