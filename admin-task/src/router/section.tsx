import { lazy } from "react";
import MainLayout from "../layouts/main-layout";

const Dashboard = lazy(() => import("@/pages/dashboard/view"));
const Users = lazy(() => import("@/pages/users/view"));
const Products = lazy(() => import("@/pages/products/view"));
const NotFound = lazy(() => import("@/pages/page-not-found"));

export const RoutesSection = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "users",
        element: <Users />,
      },
      {
        path: "products",
        element: <Products />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
