import "./index.css";
import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/theme-context";
import { RoutesSection } from "./router/section";
import Loading from "./components/loading";

const router = createBrowserRouter(RoutesSection);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ThemeProvider>
      <Suspense fallback={<Loading />}>
        <RouterProvider router={router} />
      </Suspense>
    </ThemeProvider>
  </React.StrictMode>
);
