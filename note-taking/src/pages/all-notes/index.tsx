import { useState } from "react";
import { Plus, Tag, Clock, Trash2, Archive } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Notes } from "@/types";

export default function AllNotes() {
  const [selectedNote, setSelectedNote] = useState<number | null>(1);

  const notes: Notes[] = [
    {
      id: 1,
      title: "React Performance Optimization",
      content: `Key performance optimization techniques:\n
1. Code Splitting\n- Use React.lazy() for route-based splitting\n- Implement dynamic imports for heavy components\n
2. Memoization\n- useMemo for expensive calculations\n- useCallback for function props\n- React.memo for component optimization\n
3. Virtual List Implementation\n- Use react-window for long lists\n- Implement infinite scrolling\n\nTODO: Benchmark current application and identify bottlenecks.`,
      tags: ["Dev", "React"],
      date: "29 Oct 2024",
    },
    {
      id: 2,
      title: "Japan Travel Planning",
      content:
        "Plan itinerary for Kyoto and Tokyo, book accommodations, and list must-try restaurants.",
      tags: ["Travel", "Personal"],
      date: "28 Oct 2024",
    },
    {
      id: 3,
      title: "Favorite Pasta Recipes",
      content:
        "Carbonara, Pesto, and Alfredo recipes with ingredients and steps.",
      tags: ["Cooking", "Recipes"],
      date: "27 Oct 2024",
    },
  ];

  const selected = notes.find((n) => n.id === selectedNote);

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4 h-full">
      <aside className="md:col-span-2 lg:col-span-2 border-r pr-4">
        <button className="w-full mb-4 py-2 bg-primary text-primary-foreground rounded-md flex items-center justify-center gap-2 hover:opacity-90">
          <Plus className="w-4 h-4" /> Create New Note
        </button>

        <div className="flex flex-col gap-3">
          {notes.map((note) => (
            <button
              key={note.id}
              onClick={() => setSelectedNote(note.id)}
              className={cn(
                "text-left p-3 rounded-md transition border hover:bg-accent",
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
              <p className="text-xs text-muted-foreground mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                {note.date}
              </p>
            </button>
          ))}
        </div>
      </aside>

      <main className="md:col-span-2 lg:col-span-3 p-4 overflow-y-auto">
        {selected ? (
          <>
            <h2 className="text-xl font-semibold mb-2">{selected.title}</h2>
            <div className="flex gap-2 mb-4">
              {selected.tags.map((tag) => (
                <span
                  key={tag}
                  className="flex items-center gap-1 text-sm text-muted-foreground"
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
        <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-accent">
          <Archive className="w-4 h-4" /> Archive Note
        </button>
        <button className="w-full flex items-center justify-center gap-2 border rounded-md py-2 hover:bg-destructive/10 text-destructive border-destructive/50">
          <Trash2 className="w-4 h-4" /> Delete Note
        </button>
      </aside>
    </div>
  );
}
