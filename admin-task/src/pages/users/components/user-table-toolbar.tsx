type Props = {
  filterName: string;
  onFilterName: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function UserTableToolbar({ filterName, onFilterName }: Props) {
  return (
    <div className="relative max-w-md mb-6">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>

      <input
        type="text"
        value={filterName}
        onChange={onFilterName}
        placeholder="Search user..."
        className="w-64 pl-9 pr-4 py-2 border border-gray-300 rounded-md shadow-sm 
                   text-sm placeholder-gray-400 focus:outline-none 
                   focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
  );
}
