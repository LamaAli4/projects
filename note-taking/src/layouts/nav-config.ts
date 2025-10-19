import { Home, Archive } from "lucide-react";

export interface NavItem {
  label: string;
  path: string;
  icon?: React.ComponentType<{ className?: string }>;
  children?: NavItem[];
}

export const mainNav: NavItem[] = [
  {
    label: "All Notes",
    path: "/",
    icon: Home,
  },
  {
    label: "Archived Notes",
    path: "/archived",
    icon: Archive,
  },
];
