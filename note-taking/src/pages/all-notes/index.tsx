import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useNotes } from "@/context/notes-context";
import type { Notes } from "@/types";
import NoteModal from "./note-model";
import EditNoteModal from "./note-model/edit-note-modal";
import NotesEmptyState from "./components/notes-empty-state";
import NotesList from "./components/notes-list";
import NoteDetails from "./components/note-details";
import NotesActions from "./components/notes-actions";
import { Button } from "@/components/ui/button";

export default function AllNotes() {
  const { notes, setNotes, archivedNotes, setArchivedNotes, searchQuery } =
    useNotes();
  const [selectedNote, setSelectedNote] = useState<number | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [searchParams] = useSearchParams();

  const tagFilter = searchParams.get("tag");

  const filteredNotes = notes.filter((note) => {
    const matchesTag = tagFilter
      ? note.tags.some((t) => t.toLowerCase() === tagFilter.toLowerCase())
      : true;

    const matchesSearch =
      !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) =>
        t.toLowerCase().includes(searchQuery.toLowerCase())
      );

    return matchesTag && matchesSearch;
  });

  const selected = filteredNotes.find((n) => n.id === selectedNote);

  const handleAddNote = (note: Notes) => {
    setNotes([...notes, note]);
    setSelectedNote(note.id);
    setShowAddModal(false);
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter((n) => n.id !== id));
    setSelectedNote(null);
  };

  const handleArchiveNote = (id: number) => {
    const noteToArchive = notes.find((n) => n.id === id);
    if (!noteToArchive) return;
    setArchivedNotes([...archivedNotes, noteToArchive]);
    setNotes(notes.filter((n) => n.id !== id));
    setSelectedNote(null);
  };

  const handleUpdateNote = (updatedNote: Notes) => {
    setNotes(notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)));
    setShowEditModal(false);
  };

  const handleGoBack = () => setSelectedNote(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 h-full relative transition-all">
      <aside
        className={cn(
          "lg:col-span-2 border-r pr-4 transition-all duration-300",
          selected ? "hidden lg:block" : "block"
        )}
      >
        <Button
          onClick={() => setShowAddModal(true)}
          className="w-full mb-4 py-6 text-lg bg-primary text-primary-foreground rounded-md flex items-center justify-center cursor-pointer gap-2 hover:opacity-90"
        >
          <Plus className="w-4 h-4" /> Create New Note
        </Button>

        {filteredNotes.length === 0 ? (
          <NotesEmptyState searchQuery={searchQuery} tagFilter={tagFilter} />
        ) : (
          <NotesList
            filteredNotes={filteredNotes}
            selectedNote={selectedNote}
            setSelectedNote={setSelectedNote}
            setShowAddModal={setShowAddModal}
          />
        )}
      </aside>

      <main
        className={cn(
          "p-4 overflow-y-auto transition-all duration-300",
          selected ? "block lg:col-span-3" : "hidden lg:block"
        )}
      >
        {selected && (
          <NoteDetails
            selected={selected}
            handleGoBack={handleGoBack}
            handleDeleteNote={handleDeleteNote}
            handleArchiveNote={handleArchiveNote}
            setShowEditModal={setShowEditModal}
          />
        )}

        {!selected && (
          <p className="hidden lg:block text-muted-foreground text-center">
            Select a note to view its details.
          </p>
        )}
      </main>

      {selected && (
        <NotesActions
          noteId={selected.id}
          onEdit={() => setShowEditModal(true)}
          onArchive={handleArchiveNote}
          onDelete={handleDeleteNote}
        />
      )}

    
      {showAddModal && (
        <NoteModal
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddNote}
        />
      )}

      {showEditModal && selected && (
        <EditNoteModal
          note={selected}
          onClose={() => setShowEditModal(false)}
          onUpdate={handleUpdateNote}
        />
      )}
    </div>
  );
}
