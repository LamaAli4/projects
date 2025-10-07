import { useState } from "react";
import { _users } from "@/_mock";
import { useColumns } from "../hooks/use-columns";
import { TableNoData } from "../components/table-no-data";
import { DataTable } from "@/components/table/data-table";
import UserTableToolbar from "../components/user-table-toolbar";

export default function UsersList() {
  const columns = useColumns();
  const [filterName, setFilterName] = useState("");

  const filteredUsers = _users.filter((user) =>
    user.name.toLowerCase().includes(filterName.toLowerCase())
  );

  const notFound = !filteredUsers.length && !!filterName;

  return (
    <div className="p-6 lg:p-8 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary-darker tracking-tight">
          Users
        </h1>

        <button
          className="self-start sm:self-auto px-5 py-2.5 bg-primary text-white text-sm
                     font-medium rounded-lg shadow-sm hover:bg-primary-dark
                     hover:shadow-md active:scale-95 transition-all duration-200 flex items-center gap-2"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
          New User
        </button>
      </div>

      <UserTableToolbar
        filterName={filterName}
        onFilterName={(e) => setFilterName(e.target.value)}
      />

      <DataTable
        columns={columns}
        data={filteredUsers}
        minTableWidth={720}
        initialPageSize={5}
        emptyState={
          notFound ? (
            <TableNoData searchQuery={filterName} />
          ) : (
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-medium">No users available</p>
            </div>
          )
        }
        rowClassName={(index) =>
          index % 2 === 0
            ? "bg-white hover:bg-secondary-lighter/30 transition-all"
            : "bg-secondary-lighter/10 hover:bg-secondary-light/20 transition-all"
        }
      />
    </div>
  );
}
