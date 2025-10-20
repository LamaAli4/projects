import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import type { Notes } from "@/types";
import { noteSchema, type NoteFormData } from "@/schemas/note-schema";

interface NoteFormProps {
  onClose: () => void;
  onAdd: (note: Notes) => void;
}

export default function NoteForm({ onClose, onAdd }: NoteFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
  });

  const onSubmit = (data: NoteFormData) => {
    const formattedTags = data.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)
      .map((t) => t.charAt(0).toUpperCase() + t.slice(1).toLowerCase());

    const newNote: Notes = {
      id: Date.now(),
      title: data.title,
      content: data.content,
      tags: formattedTags,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    console.log("Submitted Data:", data);

    onAdd(newNote);
    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-foreground/90">Title</label>
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
        <label className="text-sm font-medium text-foreground/90">Tags</label>
        <input
          {...register("tags")}
          type="text"
          placeholder="e.g. Work, Ideas, React"
          className="border rounded-lg px-3 py-2 text-sm w-full focus:ring-2 focus:ring-primary/70 focus:outline-none bg-background"
        />
        {errors.tags && (
          <p className="text-destructive text-xs mt-1">{errors.tags.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-all font-medium cursor-pointer"
      >
        Add Note
      </Button>
    </form>
  );
}
