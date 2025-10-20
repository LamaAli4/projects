import { useState } from "react";
import { useNotes } from "@/context/notes-context";
import { cn } from "@/lib/utils";
import { Tag, Clock, Upload, Trash2, ArrowLeft } from "lucide-react";

export default function ArchivedNotes() {
  const { archivedNotes, setArchivedNotes, notes, setNotes, searchQuery } =
    useNotes();
  const [selectedNote, setSelectedNote] = useState<number | null>(null);

  const filteredArchived = archivedNotes.filter((note) => {
    if (!searchQuery) return true;
    const lower = searchQuery.toLowerCase();
    return (
      note.title.toLowerCase().includes(lower) ||
      note.content.toLowerCase().includes(lower) ||
      note.tags.some((t) => t.toLowerCase().includes(lower))
    );
  });

  const selected = filteredArchived.find((n) => n.id === selectedNote);

  const handleUnarchive = (id: number) => {
    const noteToRestore = archivedNotes.find((n) => n.id === id);
    if (!noteToRestore) return;
    setNotes([...notes, noteToRestore]);
    setArchivedNotes(archivedNotes.filter((n) => n.id !== id));
    setSelectedNote(null);
  };

  const handleDeleteArchived = (id: number) => {
    setArchivedNotes(archivedNotes.filter((n) => n.id !== id));
    setSelectedNote(null);
  };

  const handleGoBack = () => setSelectedNote(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full relative transition-all p-6">
      <aside
        className={cn(
          "md:col-span-2 lg:col-span-2 border-r pr-4 transition-all duration-300",
          selected ? "hidden lg:block" : "block"
        )}
      >
        {filteredArchived.length === 0 ? (
          <p className="text-muted-foreground text-center mt-10 text-base sm:text-lg">
            {searchQuery
              ? `No archived notes found for "${searchQuery}".`
              : "No archived notes yet."}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {filteredArchived.map((note) => (
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
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {note.date}
                </p>
              </button>
            ))}
          </div>
        )}
      </aside>

      <main
        className={cn(
          "md:col-span-2 lg:col-span-3 p-4 overflow-y-auto",
          selected ? "col-span-1 block" : "hidden md:block"
        )}
      >
        {selected ? (
          <>
            <div className="flex items-center justify-between mb-4 lg:hidden sticky top-0 bg-background py-2 border-b">
              <button
                onClick={handleGoBack}
                className="p-2 rounded-md hover:bg-accent"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleUnarchive(selected.id)}
                  className="p-2 rounded-md hover:bg-accent"
                >
                  <Upload className="w-5 h-5 text-primary" />
                </button>
                <button
                  onClick={() => handleDeleteArchived(selected.id)}
                  className="p-2 rounded-md text-destructive hover:bg-destructive/10 border border-destructive/30"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold mb-2 break-words">
              {selected.title}
            </h2>

            <div className="flex gap-2 mb-4 flex-wrap">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-sm text-muted-foreground bg-muted px-2 py-1 rounded-md"
                >
                  <Tag className="w-3 h-3" /> {tag}
                </span>
              ))}
            </div>

            <p className="text-sm whitespace-pre-line leading-relaxed text-muted-foreground break-words">
              {selected.content}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground text-center mt-10">
            Select an archived note to view its details.
          </p>
        )}
      </main>

      {selected && (
        <aside className="hidden lg:flex flex-col gap-3 items-stretch justify-start p-4 border-l">
          <button
            onClick={() => handleUnarchive(selected.id)}
            className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent transition cursor-pointer"
          >
            <Upload className="w-4 h-4" /> Unarchive
          </button>

          <button
            onClick={() => handleDeleteArchived(selected.id)}
            className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-destructive/10 cursor-pointer text-destructive border-destructive/50 transition"
          >
            <Trash2 className="w-4 h-4" /> Delete
          </button>
        </aside>
      )}
    </div>
  );
}
