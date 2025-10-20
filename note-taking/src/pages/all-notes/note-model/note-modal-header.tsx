import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface HeaderProps {
  onClose: () => void;
}

export default function NoteModalHeader({ onClose }: HeaderProps) {
  return (
    <>
      <Button
        onClick={onClose}
        className="absolute top-3 right-3 hover:text-foreground transition cursor-pointer"
      >
        <X className="w-4 h-4" />
      </Button>

      <h2 className="text-lg font-semibold mb-4 text-center">
        Create New Note
      </h2>
    </>
  );
}
