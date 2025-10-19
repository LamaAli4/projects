"use client";
import { useTheme } from "@/context/theme-context";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md hover:bg-accent transition-colors"
      title="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="w-4 h-4 text-sidebar-foreground cursor-pointer" />
      ) : (
        <Moon className="w-4 h-4 text-sidebar-foreground cursor-pointer" />
      )}
    </button>
  );
}
