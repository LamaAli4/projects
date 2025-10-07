import { forwardRef } from "react";
import { Search } from "lucide-react";

type Props = {
  open: boolean;
  onToggle: () => void;
};

const SearchDropdown = forwardRef<HTMLDivElement, Props>(
  ({ open, onToggle }, ref) => {
    return (
      <div className="relative" ref={ref}>
        <button
          onClick={onToggle}
          className="w-10 h-10 flex items-center cursor-pointer justify-center rounded-full hover:bg-gray-100 transition"
        >
          <Search className="w-5 h-5 text-gray-600" />
        </button>

        {open && (
          <div
            className="fixed inset-0 z-[45] bg-black/10 md:hidden"
            onClick={onToggle}
          />
        )}

        {open && (
          <div
            id="search-panel"
            className={`fixed inset-x-3 top-[4.5rem] z-[50] rounded-2xl
          md:absolute md:inset-auto md:right-0 md:top-auto md:mt-sm md:rounded-xl
          bg-white border border-gray-200 shadow-xl`}
            role="dialog"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onToggle();
              }}
              className="p-md flex items-center gap-sm w-full md:w-80"
            >
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search..."
                autoFocus
                className="flex-1 outline-none text-sm text-gray-700 bg-transparent"
              />
              <button
                type="submit"
                className="px-md py-xs rounded-md bg-primary text-white text-sm hover:bg-primary-dark transition cursor-pointer shrink-0"
              >
                Search
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
);

export default SearchDropdown;
