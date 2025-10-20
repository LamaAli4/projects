import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";
import { mainNav } from "@/layouts/nav-config";
import { Tag, X } from "lucide-react";
import { useNotes } from "@/context/notes-context";

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const location = useLocation();
  const path = location.pathname;
  const searchParams = new URLSearchParams(location.search);
  const activeTag = searchParams.get("tag");
  const navigate = useNavigate();

  const { notes } = useNotes();

  const tags = Array.from(new Set(notes.flatMap((note) => note.tags))).sort();

  const handleTagClick = (tag: string) => {
    navigate(`/notes?tag=${tag}`);
    setIsOpen(false);
  };

  return (
    <>
      <aside
        className={cn(
          "fixed sm:static top-0 left-0 min-h-screen w-64 border-r bg-[var(--sidebar)] text-[var(--sidebar-foreground)] border-[var(--sidebar-border)] flex flex-col p-4 transform transition-transform duration-300 ease-in-out z-40",
          isOpen ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between mb-6 px-2">
          <h1 className="text-lg font-semibold font-logo">Notes</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="sm:hidden text-muted-foreground hover:text-foreground transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {mainNav.map(({ label, path: route, icon: Icon }) => (
            <NavLink
              key={route}
              to={route}
              onClick={() => setIsOpen(false)}
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

        <div className="mt-6 flex-1 overflow-y-auto">
          <h2 className="text-xs font-medium text-muted-foreground px-3 mb-1">
            Tags
          </h2>

          {tags.length > 0 ? (
            <ul className="flex flex-col gap-1">
              {tags.map((tag) => (
                <li key={tag}>
                  <button
                    onClick={() => handleTagClick(tag)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm transition-colors w-full text-left cursor-pointer",
                      activeTag === tag
                        ? "bg-sidebar-accent text-sidebar-accent-foreground ring-1 ring-sidebar-ring"
                        : "text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    )}
                  >
                    <Tag
                      className={cn(
                        "w-4 h-4 opacity-70",
                        activeTag === tag
                          ? "text-sidebar-accent-foreground"
                          : ""
                      )}
                    />
                    {tag}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-muted-foreground px-3 mt-2">
              No tags yet
            </p>
          )}
        </div>
      </aside>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-sm sm:hidden z-30 transition-opacity duration-300"
        />
      )}
    </>
  );
}
