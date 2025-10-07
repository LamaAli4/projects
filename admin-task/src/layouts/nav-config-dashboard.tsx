import { LayoutDashboard, Users, ShoppingCart } from "lucide-react";

export type NavItem = {
  name: string;
  path?: string;
  icon?: React.ReactNode;
  children?: NavItem[];
};

export const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    name: "Users",
    icon: <Users className="w-5 h-5" />,
    children: [
      {
        name: "All Users",
        path: "/users",
      },
      {
        name: "Add User",
        path: "/users/add",
      },
    ],
  },
  {
    name: "Products",
    icon: <ShoppingCart className="w-5 h-5" />,
    children: [
      {
        name: "All Products",
        path: "/products",
      },
      {
        name: "Add Product",
        path: "/products/add",
      },
    ],
  },
];

