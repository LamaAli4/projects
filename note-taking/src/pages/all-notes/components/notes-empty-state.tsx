interface NotesEmptyStateProps {
  searchQuery: string;
  tagFilter: string | null;
}

export default function NotesEmptyState({
  searchQuery,
  tagFilter,
}: NotesEmptyStateProps) {
  return (
    <p className="text-muted-foreground text-center mt-10">
      {searchQuery
        ? `No notes found for "${searchQuery}".`
        : tagFilter
        ? `No notes found for "${tagFilter}" tag.`
        : "No notes yet. Click “Create New Note” to get started!"}
    </p>
  );
}
