import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import ThemeToggle from "./theme-toggle";
import { mainNav } from "@/layouts/nav-config";
import { Tag } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const path = location.pathname;

  const tags = [
    "Cooking",
    "Dev",
    "Fitness",
    "Health",
    "Personal",
    "React",
    "Recipes",
    "Shopping",
    "Travel",
    "TypeScript",
  ];

  return (
    <aside className="w-64 h-screen border-r bg-sidebar text-sidebar-foreground flex flex-col p-4">
      <div className="flex items-center justify-between mb-6 px-2">
        <h1 className="text-lg font-semibold font-logo">Notes</h1>
        <ThemeToggle />
      </div>

      <nav className="flex flex-col gap-1">
        {mainNav.map(({ label, path: route, icon: Icon }) => (
          <NavLink
            key={route}
            to={route}
            className={({ isActive }) =>
              cn(
                "flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-sidebar-ring"
                  : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-muted-foreground"
              )
            }
          >
            {Icon && (
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  path === route
                    ? "text-sidebar-primary"
                    : "text-muted-foreground"
                )}
              />
            )}
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6">
        <h2 className="text-xs font-medium text-muted-foreground px-3 mb-1">
          Tags
        </h2>
        <ul className="flex flex-col gap-1">
          {tags.map((tag) => (
            <li key={tag}>
              <button
                className={cn(
                  "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground w-full text-left"
                )}
              >
                <Tag className="w-4 h-4 opacity-70" />
                {tag}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
