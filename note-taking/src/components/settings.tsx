import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Settings, Check } from "lucide-react";
import ThemeToggle from "./theme-toggle";

export default function SettingsDropdown() {
  const [font, setFont] = useState(
    () => localStorage.getItem("font") || "Poppins"
  );

  useEffect(() => {
    let fontValue = "var(--font-poppins)";
    if (font === "Urbanist") fontValue = "var(--font-urbanist)";
    if (font === "Playfair Display") fontValue = "var(--font-playfair)";
    document.documentElement.style.setProperty("--font-sans", fontValue);
  }, [font]);

  const handleFontChange = (value: string) => {
    setFont(value);
    localStorage.setItem("font", value);

    let fontValue = "var(--font-poppins)";
    if (value === "Urbanist") fontValue = "var(--font-urbanist)";
    if (value === "Playfair Display") fontValue = "var(--font-playfair)";
    document.documentElement.style.setProperty("--font-sans", fontValue);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="p-2 rounded-md hover:bg-accent transition cursor-pointer">
          <Settings className="w-5 h-5 text-muted-foreground cursor-pointer" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="w-56 bg-background text-foreground"
      >
        <DropdownMenuLabel>Settings</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <div className="flex items-center justify-between px-2 py-1.5">
          <span className="text-sm font-medium">Theme</span>
          <ThemeToggle />
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuLabel className="text-xs text-muted-foreground">
          Font
        </DropdownMenuLabel>

        <DropdownMenuItem onSelect={() => handleFontChange("Poppins")}>
          <div className="flex items-center justify-between w-full">
            <span>Poppins</span>
            {font === "Poppins" && <Check className="w-4 h-4 text-primary" />}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => handleFontChange("Urbanist")}>
          <div className="flex items-center justify-between w-full">
            <span>Urbanist</span>
            {font === "Urbanist" && <Check className="w-4 h-4 text-primary" />}
          </div>
        </DropdownMenuItem>

        <DropdownMenuItem onSelect={() => handleFontChange("Playfair Display")}>
          <div className="flex items-center justify-between w-full">
            <span>Playfair Display</span>
            {font === "Playfair Display" && (
              <Check className="w-4 h-4 text-primary" />
            )}
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
