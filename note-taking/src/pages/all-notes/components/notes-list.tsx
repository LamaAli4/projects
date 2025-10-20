import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notes } from "@/types";

interface NotesListProps {
  filteredNotes: Notes[];
  selectedNote: number | null;
  setSelectedNote: (id: number | null) => void;
  setShowAddModal: (val: boolean) => void;
}

export default function NotesList({
  filteredNotes,
  selectedNote,
  setSelectedNote,
}: NotesListProps) {
  return (
    <>

      <div className="flex flex-col gap-3">
        {filteredNotes.map((note) => (
          <button
            key={note.id}
            onClick={() => setSelectedNote(note.id)}
            className={cn(
              "text-left p-3 rounded-md transition border hover:bg-accent cursor-pointer",
              selectedNote === note.id
                ? "border-primary bg-accent"
                : "border-transparent"
            )}
          >
            <h3 className="font-medium">{note.title}</h3>
            <div className="flex flex-wrap gap-2 mt-1">
              {note.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {note.date}
            </p>
          </button>
        ))}
      </div>
    </>
  );
}
