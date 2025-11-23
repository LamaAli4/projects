import React from 'react';
import { format } from 'date-fns';

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

const PrayerTimesTable: React.FC<PrayerTimesTableProps> = ({
  prayerTimes,
  isLoading,
  error,
}) => {
  const formatTime = (timeStr: string) => {
    try {
      const [hours, minutes] = timeStr.split(':');
      const date = new Date();
      date.setHours(parseInt(hours, 10), parseInt(minutes, 10));
      return format(date, 'h:mm a');
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (e) {
      return timeStr;
    }
  };

  const prayerData = React.useMemo(() => {
    if (!prayerTimes) return [];
    return [
      { name: 'Fajr', time: prayerTimes.Fajr },
      { name: 'Dhuhr', time: prayerTimes.Dhuhr },
      { name: 'Asr', time: prayerTimes.Asr },
      { name: 'Maghrib', time: prayerTimes.Maghrib },
      { name: 'Isha', time: prayerTimes.Isha },
    ];
  }, [prayerTimes]);

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
          <div className="shrink-0">
          </div>
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
        <svg
          className="mx-auto h-12 w-12 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900">No prayer times available</h3>
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
          <tr>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Prayer
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Adhan
            </th>
            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
              Iqama
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {prayerData.map((prayer) => (
            <tr key={prayer.name} className="hover:bg-gray-50">
              <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                {prayer.name}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatTime(prayer.time)}
              </td>
              <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                {formatTime(prayer.time)}
              </td>
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
