import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Tag, Clock, Trash2, Archive, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import NoteModal from "./note-model";
import { Button } from "@/components/ui/button";
import { useNotes } from "@/context/notes-context";
import type { Notes } from "@/types";

export default function AllNotes() {
  const { notes, setNotes, archivedNotes, setArchivedNotes } = useNotes();
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [searchParams] = useSearchParams();

  const tagFilter = searchParams.get("tag");

  const filteredNotes = tagFilter
    ? notes.filter((note) =>
        note.tags.some((t) => t.toLowerCase() === tagFilter.toLowerCase())
      )
    : notes;

  const selected = filteredNotes.find((n) => n.id === selectedNote);

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

  const handleArchiveNote = (id: number) => {
    const noteToArchive = notes.find((n) => n.id === id);
    if (!noteToArchive) return;

    const updatedNotes = notes.filter((n) => n.id !== id);
    const updatedArchived = [...archivedNotes, noteToArchive];

    setNotes(updatedNotes);
    setArchivedNotes(updatedArchived);
    setSelectedNote(null);
  };

  const handleGoBack = () => {
    setSelectedNote(null);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full relative transition-all">
      <aside
        className={cn(
          "md:col-span-2 lg:col-span-2 border-r pr-4 transition-all duration-300",
          selected ? "hidden lg:block" : "block"
        )}
      >
        {tagFilter && (
          <div className="md:col-span-4 lg:col-span-6">
            <h2 className="text-lg font-medium mb-4">
              Notes tagged:
              <span className="ml-2 px-2 py-0.5 rounded-md bg-primary/10 text-primary font-semibold">
                {tagFilter}
              </span>
            </h2>
          </div>
        )}

        <Button
          onClick={() => setShowModal(true)}
          className="w-full mb-4 py-6 text-lg bg-primary text-primary-foreground rounded-md flex items-center justify-center cursor-pointer gap-2 hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Create New Note
        </Button>

        {filteredNotes.length === 0 ? (
          <p className="text-muted-foreground text-center mt-10 ">
            {tagFilter
              ? `No notes found for "${tagFilter}" tag`
              : "No notes yet. Click “Create New Note” to get started!"}
          </p>
        ) : (
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
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleArchiveNote(selected.id)}
                  className="p-2 rounded-md hover:bg-accent"
                  aria-label="Archive"
                >
                  <Archive className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteNote(selected.id)}
                  className="p-2 rounded-md text-destructive hover:bg-destructive/10 border border-destructive/30"
                  aria-label="Delete"
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
            <button
              onClick={() => handleArchiveNote(selected.id)}
              className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent transition cursor-pointer"
            >
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
