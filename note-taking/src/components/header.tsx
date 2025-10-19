import { useLocation } from "react-router-dom";
import { Search, Settings } from "lucide-react";
import { mainNav } from "@/layouts/nav-config";

export default function Header() {
  const location = useLocation();

  const currentPage = mainNav.find((item) => item.path === location.pathname);
  const pageTitle = currentPage ? currentPage.label : "Notes";

  return (
    <header className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold">{pageTitle}</h1>

      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by title, content, or tags..."
            className="pl-9 pr-3 py-2 text-sm border rounded-md w-72 focus:outline-none focus:ring-2 focus:ring-sidebar-ring bg-background"
          />
        </div>

        <button className="p-2 rounded-md hover:bg-accent">
          <Settings className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
