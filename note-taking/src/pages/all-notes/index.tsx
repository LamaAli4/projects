import { useEffect, useState } from "react";
import { Plus, Tag, Clock, Trash2, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notes } from "@/types";
import NoteModal from "./note-model";
import { Button } from "@/components/ui/button";
import { getNotes, saveNotes } from "@/utils/storage-notes";

export default function AllNotes() {
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [notes, setNotes] = useState<Notes[]>(() => getNotes());

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const selected = notes.find((n) => n.id === selectedNote);

  const handleAddNote = (note: Notes) => {
    const updatedNotes = [...notes, note];
    setNotes(updatedNotes);
    setSelectedNote(note.id);
    setShowModal(false);
  };

  const handleDeleteNote = (id: number) => {
    const updatedNotes = notes.filter((n) => n.id !== id);
    setNotes(updatedNotes);
    setSelectedNote(null);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full relative">
      <aside className="md:col-span-2 lg:col-span-2 border-r pr-4">
        <Button
          onClick={() => setShowModal(true)}
          className="w-full mb-4 py-6 text-lg bg-primary text-primary-foreground rounded-md flex items-center justify-center
          cursor-pointer gap-2 hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Create New Note
        </Button>

        {notes.length === 0 ? (
          <p className="text-muted-foreground text-center mt-10">
            No notes yet. Click “Create New Note” to get started!
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {notes.map((note) => (
              <button
                key={note.id}
                onClick={() => setSelectedNote(note.id)}
                className={cn(
                  "text-left p-3 rounded-md transition border hover:bg-accent",
                  selectedNote === note.id
                    ? "border-primary bg-muted"
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
                <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {note.date}
                </p>
              </button>
            ))}
          </div>
        )}
      </aside>

      <main className="md:col-span-2 lg:col-span-3 p-4 overflow-y-auto">
        {selected ? (
          <>
            <h2 className="text-2xl font-semibold mb-2">{selected.title}</h2>

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

            <p className="text-sm whitespace-pre-line leading-relaxed text-muted-foreground">
              {selected.content}
            </p>
          </>
        ) : (
          <p className="text-muted-foreground text-center mt-10">
            Select a note to view its details.
          </p>
        )}
      </main>

      <aside className="hidden lg:flex flex-col gap-3 items-stretch justify-start p-4 border-l">
        {selected && (
          <>
            <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent transition cursor-pointer">
              <Archive className="w-4 h-4" /> Archive Note
            </button>

            <button
              onClick={() => handleDeleteNote(selected.id)}
              className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-destructive/10 cursor-pointer text-destructive border-destructive/50 transition"
            >
              <Trash2 className="w-4 h-4" /> Delete Note
            </button>
          </>
        )}
      </aside>

      {showModal && (
        <NoteModal onClose={() => setShowModal(false)} onAdd={handleAddNote} />
      )}
    </div>
  );
}
