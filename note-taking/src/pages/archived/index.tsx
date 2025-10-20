import { Tag, Clock, Trash2, Upload } from "lucide-react";
import { useNotes } from "@/context/notes-context";
import { cn } from "@/lib/utils";

export default function ArchivedNotes() {
  const { archivedNotes, setArchivedNotes, notes, setNotes } = useNotes();

  const handleDeleteArchived = (id: number) => {
    const updated = archivedNotes.filter((n) => n.id !== id);
    setArchivedNotes(updated);
  };

  const handleUnarchive = (id: number) => {
    const noteToRestore = archivedNotes.find((n) => n.id === id);
    if (!noteToRestore) return;

    const updatedNotes = [...notes, noteToRestore];
    setNotes(updatedNotes);

    const updatedArchived = archivedNotes.filter((n) => n.id !== id);
    setArchivedNotes(updatedArchived);
  };

  return (
    <div className="p-6">
      {archivedNotes.length === 0 ? (
        <p className="text-muted-foreground">No archived notes yet.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {archivedNotes.map((note) => (
            <div
              key={note.id}
              className={cn(
                "border rounded-lg p-4 bg-card text-card-foreground shadow-sm hover:shadow-md transition"
              )}
            >
              <h2 className="text-lg font-medium">{note.title}</h2>

              <div className="flex flex-wrap gap-2 mt-2">
                {note.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-muted px-2 py-0.5 rounded-md text-muted-foreground"
                  >
                    <Tag className="w-3 h-3 inline mr-1" /> {tag}
                  </span>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {note.date}
              </p>

              <p className="text-sm text-muted-foreground mt-3 whitespace-pre-line">
                {note.content}
              </p>

              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleUnarchive(note.id)}
                  className="text-sm flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <Upload className="w-4 h-4" /> Unarchive
                </button>

                <button
                  onClick={() => handleDeleteArchived(note.id)}
                  className="text-destructive text-sm flex items-center gap-1 hover:underline"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
