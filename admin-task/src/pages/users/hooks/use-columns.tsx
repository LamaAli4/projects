"use client";

import type { User } from "@/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Check, X, MoreHorizontal } from "lucide-react";

export function useColumns(): ColumnDef<User>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <input
          type="checkbox"
          checked={table.getIsAllPageRowsSelected()}
          onChange={table.getToggleAllPageRowsSelectedHandler()}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer transition-all duration-200"
        />
      ),
      cell: ({ row }) => (
        <input
          type="checkbox"
          checked={row.getIsSelected()}
          onChange={row.getToggleSelectedHandler()}
          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0 cursor-pointer transition-all duration-200"
        />
      ),
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ getValue }) => (
        <span className="font-medium text-gray-900">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "company",
      header: "Company",
      cell: ({ getValue }) => (
        <span className="text-gray-600">{getValue<string>()}</span>
      ),
    },
    {
      accessorKey: "role",
      header: "Role",
      cell: ({ getValue }) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
          {getValue<string>()}
        </span>
      ),
    },
    {
      accessorKey: "isVerified",
      header: "Verified",
      cell: ({ getValue }) => {
        const isVerified = getValue<boolean>();
        return isVerified ? (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-100 shadow-sm ring-1 ring-emerald-200">
            <Check className="w-4 h-4 text-emerald-600" strokeWidth={2.5} />
          </span>
        ) : (
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-100 shadow-sm ring-1 ring-red-200">
            <X className="w-4 h-4 text-red-600" strokeWidth={2.5} />
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue<string>();
        const isActive = status?.toLowerCase() === "active";
        return (
          <span
            className={`inline-flex items-center min-w-[80px] justify-center px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all duration-200 ${
              isActive
                ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
                : "bg-red-100 text-red-700 ring-1 ring-red-200"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                isActive ? "bg-emerald-500" : "bg-red-500"
              }`}
            />
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </span>
        );
      },
    },
    {
      id: "actions",
      header: "",
      cell: () => (
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-all duration-200 active:scale-95 group">
          <MoreHorizontal className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors duration-200" />
        </button>
      ),
    },
  ];
}
