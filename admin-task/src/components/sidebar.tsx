import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { navItems, type NavItem } from "../layouts/nav-config-dashboard";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  // Recursive function
  const RenderMenuItem = ({
    item,
    depth = 0,
  }: {
    item: NavItem;
    depth?: number;
  }) => {
    const [open, setOpen] = useState(false);
    const hasChildren = item.children && item.children.length > 0;
    const isActive = item.path && location.pathname === item.path;

    return (
      <div>
        <div
          className={`flex items-center justify-between px-4 py-2 rounded-md transition-colors ${
            isActive
              ? "bg-primary-lighter text-primary font-semibold shadow-sm"
              : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          }`}
          style={{ paddingInlineStart: `${depth * 16 + 12}px` }}
        >
          <Link
            to={item.path || "#"}
            onClick={() => !hasChildren && setIsOpen(false)}
            className="flex items-center gap-2 flex-1"
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.name}</span>
          </Link>

          {hasChildren && (
            <button
              onClick={() => setOpen(!open)}
              className="p-1 hover:bg-gray-200 rounded-md"
            >
              {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </button>
          )}
        </div>

        {open &&
          hasChildren &&
          item.children!.map((child) => (
            <RenderMenuItem key={child.name} item={child} depth={depth + 1} />
          ))}
      </div>
    );
  };

  return (
    <>
      <button
        className="fixed top-4 left-4 z-[70] p-2 rounded-md bg-primary-darker text-white lg:hidden"
        onClick={() => setIsOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60]"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-screen w-64 border-r border-gray-200
        flex flex-col shadow-md bg-white transform transition-transform duration-300
        z-[70] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-3 lg:hidden">
          <img src="/assets/logo.svg" alt="Logo" className="h-8 w-auto" />
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 bg-gray-100 rounded-md"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="px-4 py-3 hidden lg:block">
          <img src="/assets/logo.svg" alt="Logo" className="h-10 w-auto" />
        </div>

        <nav className="flex-1 px-2 py-2 overflow-y-auto">
          {navItems.map((item) => (
            <RenderMenuItem key={item.name} item={item} />
          ))}
        </nav>
      </aside>
    </>
  );
}
