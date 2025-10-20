import NoteForm from "./note-form";
import NoteModalHeader from "./note-modal-header";
import type { Notes } from "@/types";

interface NoteModalProps {
  onClose: () => void;
  onAdd: (note: Notes) => void;
}

export default function NoteModal({ onClose, onAdd }: NoteModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-background p-8 rounded-xl shadow-xl w-[95%] max-w-2xl h-[70vh] overflow-y-auto relative transition-all">
        <NoteModalHeader onClose={onClose} />

        <NoteForm onAdd={onAdd} onClose={onClose} />
      </div>
    </div>
  );
}
