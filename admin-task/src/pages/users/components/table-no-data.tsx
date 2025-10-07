export function TableNoData({ searchQuery }: { searchQuery: string }) {
  return (
    <div>
      No results found for <span className="font-medium">"{searchQuery}"</span>
    </div>
  );
}
