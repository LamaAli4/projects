import React from "react";
import { format } from "date-fns";
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export interface PrayerTimeData {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise?: string;
  Sunset?: string;
  Imsak?: string;
  Midnight?: string;
  date?: {
    readable: string;
  };
}

interface PrayerTimesTableProps {
  prayerTimes: PrayerTimeData | null;
  isLoading: boolean;
  error: Error | null;
}

type Row = {
  prayer: string;
  adhan: string;
  iqama: string;
};

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({
  prayerTimes,
  isLoading,
  error,
}) => {
  const formatTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(":");
      const date = new Date();
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      return format(date, "h:mm a");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return timeStr;
    }
  };

  const data = React.useMemo<Row[]>(() => {
    if (!prayerTimes) return [];
    return [
      { prayer: "Fajr", adhan: prayerTimes.Fajr, iqama: prayerTimes.Fajr },
      { prayer: "Dhuhr", adhan: prayerTimes.Dhuhr, iqama: prayerTimes.Dhuhr },
      { prayer: "Asr", adhan: prayerTimes.Asr, iqama: prayerTimes.Asr },
      {
        prayer: "Maghrib",
        adhan: prayerTimes.Maghrib,
        iqama: prayerTimes.Maghrib,
      },
      { prayer: "Isha", adhan: prayerTimes.Isha, iqama: prayerTimes.Isha },
    ];
  }, [prayerTimes]);

  const columns = React.useMemo<ColumnDef<Row>[]>(
    () => [
      {
        accessorKey: "prayer",
        header: "Prayer",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "adhan",
        header: "Adhan",
        cell: (info) => formatTime(String(info.getValue() ?? "")),
      },
      {
        accessorKey: "iqama",
        header: "Iqama",
        cell: (info) => formatTime(String(info.getValue() ?? "")),
      },
    ],
    []
  );

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="shrink-0"></div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              Error loading prayer times: {error.message}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!prayerTimes) {
    return (
      <div className="text-center py-12">
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          No prayer times available
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          Select a location to see prayer times.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
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
        <tbody className="divide-y divide-gray-200 bg-white">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {prayerTimes?.date?.readable && (
        <div className="bg-gray-50 px-4 py-3 text-right text-xs text-gray-500">
          <p>Date: {prayerTimes.date.readable}</p>
        </div>
      )}
    </div>
  );
};

export default PrayerTimesTable;
