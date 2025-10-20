import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { noteSchema, type NoteFormData } from "@/schemas/note-schema";
import { useEffect } from "react";
import type { Notes } from "@/types";
import NoteModalHeader from "./note-modal-header";

interface EditNoteModalProps {
  note: Notes;
  onClose: () => void;
  onUpdate: (note: Notes) => void;
}

export default function EditNoteModal({
  note,
  onClose,
  onUpdate,
}: EditNoteModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
    },
  });

  useEffect(() => {
    reset({
      title: note.title,
      content: note.content,
      tags: note.tags.join(", "),
    });
  }, [note, reset]);

  const onSubmit = (data: NoteFormData) => {
    const formattedTags = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());

    const updatedNote: Notes = {
      ...note,
      title: data.title,
      content: data.content,
      tags: formattedTags,
    };

    onUpdate(updatedNote);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <div className="bg-background p-8 rounded-xl shadow-xl w-[95%] max-w-2xl h-[70vh] overflow-y-auto relative transition-all">
        <NoteModalHeader onClose={onClose} title="Edit Note" />
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground/90">
              Title
            </label>
            <input
              {...register("title")}
              type="text"
              placeholder="Enter note title..."
              className="border rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary/70 focus:outline-none bg-background"
            />
            {errors.title && (
              <p className="text-destructive text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground/90">
              Content
            </label>
            <textarea
              {...register("content")}
              placeholder="Write your note here..."
              rows={7}
              className="border rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary/70 focus:outline-none resize-none bg-background"
            />
            {errors.content && (
              <p className="text-destructive text-xs mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-foreground/90">
              Tags
            </label>
            <input
              {...register("tags")}
              type="text"
              placeholder="e.g. Work, Ideas, React"
              className="border rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary/70 focus:outline-none bg-background"
            />
            {errors.tags && (
              <p className="text-destructive text-xs mt-1">
                {errors.tags.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium cursor-pointer"
          >
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
