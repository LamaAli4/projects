import { z } from "zod";

export const noteSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  content: z.string().min(10, "Content must be at least 10 characters"),
  tags: z
    .string()
    .nonempty("Tags field cannot be empty")
    .refine(
      (val) => {
        const trimmed = val.trim();
        if (!trimmed) return false;

        if (/\s/.test(trimmed) && !trimmed.includes(",")) return false;

        return true;
      },
      {
        message:
          "If you add more than one tag, separate them with commas (e.g. Work, Ideas)",
      }
    ),
});

export type NoteFormData = z.infer<typeof noteSchema>;
