import { useLocation } from "react-router-dom";
import { Search, Menu } from "lucide-react";
import { mainNav } from "@/layouts/nav-config";
import SettingsDropdown from "./settings";

export default function Header({ onMenuClick }: { onMenuClick: () => void }) {
  const location = useLocation();
  const currentPage = mainNav.find((item) => item.path === location.pathname);
  const pageTitle = currentPage ? currentPage.label : "Notes";

  return (
    <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4">
      <div className="flex items-center justify-between w-full sm:w-auto">
        <div className="flex items-center gap-2">
          <button
            onClick={onMenuClick}
            className="sm:hidden p-2 rounded-md border bg-background hover:bg-accent transition"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          <h1 className="text-xl sm:text-2xl font-semibold">{pageTitle}</h1>
        </div>

        <div className="sm:hidden">
          <SettingsDropdown />
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-3">
        <div className="relative w-64 md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, content, or tags..."
            className="pl-9 pr-3 py-2 text-sm border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sidebar-ring bg-background"
          />
        </div>

        <SettingsDropdown />
      </div>

      <div className="w-full sm:hidden">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, content, or tags..."
            className="pl-9 pr-3 py-2 text-sm border rounded-md w-full focus:outline-none focus:ring-2 focus:ring-sidebar-ring bg-background"
          />
        </div>
      </div>
    </header>
  );
}
