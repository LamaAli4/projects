import * as React from "react";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

type DataTableProps<TData> = {
  columns: ColumnDef<TData, unknown>[];
  data: TData[];
  toolbar?: React.ReactNode;
  emptyState?: React.ReactNode;
  minTableWidth?: number;
  pageSizeOptions?: number[];
  initialPageSize?: number;
  rowClassName?: (index: number) => string;
};

export function DataTable<TData>({
  columns,
  data,
  toolbar,
  emptyState,
  minTableWidth = 720,
  pageSizeOptions = [5, 10, 25],
  initialPageSize = 5,
  rowClassName,
}: DataTableProps<TData>) {
  const [{ pageIndex, pageSize }, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { pagination: { pageIndex, pageSize } },
    onPaginationChange: (updater) => {
      setPagination((old) =>
        typeof updater === "function" ? updater(old) : updater
      );
    },
  });

  React.useEffect(() => {
    setPagination((old) => ({ ...old, pageIndex: 0 }));
  }, [data]);

  const rows = table.getRowModel().rows;

  return (
    <div className="overflow-hidden border border-secondary-lighter rounded-xl shadow-lg bg-white">
      {toolbar ? <div className="px-4 pt-4">{toolbar}</div> : null}

      <div className="overflow-x-auto">
        <table
          className="divide-y divide-secondary-lighter w-full"
          style={{ minWidth: minTableWidth }}
        >
          <thead className="bg-gradient-to-r from-secondary-lighter to-secondary-light/20">
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 text-left text-xs font-semibold text-secondary-darker tracking-wider"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className="divide-y divide-secondary-lighter bg-white">
            {rows.length ? (
              rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={
                    rowClassName
                      ? rowClassName(index)
                      : index % 2 === 0
                      ? "bg-white hover:bg-secondary-lighter/30 transition-all"
                      : "bg-secondary-lighter/10 hover:bg-secondary-light/20 transition-all"
                  }
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="px-6 py-4 text-sm text-secondary-darker whitespace-nowrap"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-12 text-secondary-dark"
                >
                  {emptyState ?? "No data"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-secondary-lighter/20 border-t border-secondary-lighter">
        <div className="flex items-center gap-2 text-sm text-secondary-dark">
          <span className="font-medium">Rows per page:</span>
          <select
            value={pageSize}
            onChange={(e) =>
              table.setPageSize(Number((e.target as HTMLSelectElement).value))
            }
            className="border border-secondary-light rounded-lg px-3 py-1.5 bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 cursor-pointer hover:border-secondary"
          >
            {pageSizeOptions.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm text-secondary-dark font-medium">
            {pageIndex * pageSize + 1}–
            {Math.min((pageIndex + 1) * pageSize, data.length)}{" "}
            <span className="text-secondary font-normal">of</span> {data.length}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="p-2 border border-secondary-light text-secondary rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-secondary-lighter hover:bg-secondary-lighter hover:border-secondary active:scale-95 transition-all duration-200 bg-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="p-2 border border-secondary-light text-secondary rounded-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:bg-secondary-lighter hover:bg-secondary-lighter hover:border-secondary active:scale-95 transition-all duration-200 bg-white"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
