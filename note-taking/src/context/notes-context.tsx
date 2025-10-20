import { createContext, useContext, useState, useEffect } from "react";
import type { Notes } from "@/types";
import { getNotes, saveNotes } from "@/utils/storage-notes";

interface NotesContextType {
  notes: Notes[];
  setNotes: React.Dispatch<React.SetStateAction<Notes[]>>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({ children }: { children: React.ReactNode }) {
  const [notes, setNotes] = useState<Notes[]>(() => getNotes());

  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  return (
    <NotesContext.Provider value={{ notes, setNotes }}>
      {children}
    </NotesContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) throw new Error("useNotes must be used within a NotesProvider");
  return context;
}
