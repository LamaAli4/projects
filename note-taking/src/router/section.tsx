import { lazy } from "react";
import MainLayout from "@/layouts/main-layout";
import ProtectedRoute from "./protected-route";

const AllNotes = lazy(() => import("@/pages/all-notes"));
const ArchivedNotes = lazy(() => import("@/pages/archived"));
const NotFound = lazy(() => import("@/pages/page-not-found"));
const Login = lazy(() => import("@/pages/login"));

export const RoutesSection = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AllNotes /> },
      { path: "archived", element: <ArchivedNotes /> },
      { path: "notes", element: <AllNotes /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
