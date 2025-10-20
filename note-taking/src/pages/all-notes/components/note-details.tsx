import { ArrowLeft, Edit, Archive, Trash2, Tag } from "lucide-react";
import type { Notes } from "@/types";

interface NoteDetailsProps {
  selected: Notes;
  handleGoBack: () => void;
  handleDeleteNote: (id: number) => void;
  handleArchiveNote: (id: number) => void;
  setShowEditModal: (val: boolean) => void;
}

export default function NoteDetails({
  selected,
  handleGoBack,
  handleDeleteNote,
  handleArchiveNote,
  setShowEditModal,
}: NoteDetailsProps) {
  return (
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
            onClick={() => setShowEditModal(true)}
            className="p-2 rounded-md hover:bg-accent"
          >
            <Edit className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleArchiveNote(selected.id)}
            className="p-2 rounded-md hover:bg-accent"
          >
            <Archive className="w-5 h-5" />
          </button>
          <button
            onClick={() => handleDeleteNote(selected.id)}
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
  );
}
