import type { Notes } from "@/types";

const NOTES_KEY = "notes";

export function getNotes(): Notes[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(NOTES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading notes from localStorage:", error);
    return [];
  }
}

export function saveNotes(notes: Notes[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  } catch (error) {
    console.error("Error saving notes to localStorage:", error);
  }
}
