import { Edit, Archive, Trash2 } from "lucide-react";

interface NotesActionsProps {
  noteId: number;
  onEdit: () => void;
  onArchive: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function NotesActions({
  noteId,
  onEdit,
  onArchive,
  onDelete,
}: NotesActionsProps) {
  return (
    <aside className="hidden lg:flex flex-col gap-3 items-stretch justify-start p-4 border-l sticky top-0 h-full">
      <button
        onClick={onEdit}
        className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent transition cursor-pointer"
        aria-label="Edit note"
      >
        <Edit className="w-4 h-4" /> Edit Note
      </button>

      <button
        onClick={() => onArchive(noteId)}
        className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent transition cursor-pointer"
      >
        <Archive className="w-4 h-4" /> Archive Note
      </button>

      <button
        onClick={() => onDelete(noteId)}
        className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-destructive/10 cursor-pointer text-destructive border-destructive/50 transition"
        aria-label="Delete note"
      >
        <Trash2 className="w-4 h-4" /> Delete Note
      </button>
    </aside>
  );
}
