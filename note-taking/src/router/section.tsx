import { lazy } from "react";
import MainLayout from "@/layouts/main-layout";

const AllNotes = lazy(() => import("@/pages/all-notes/index"));
const ArchivedNotes = lazy(() => import("@/pages/archived/index"));
const NotFound = lazy(() => import("@/pages/page-not-found"));

export const RoutesSection = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <AllNotes /> },
      { path: "archived", element: <ArchivedNotes /> },
      { path: "notes", element: <AllNotes /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];
