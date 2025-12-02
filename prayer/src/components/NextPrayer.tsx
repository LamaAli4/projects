import React, { useEffect, useState, useCallback } from 'react';

interface PrayerTimes {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise?: string;
  Sunset?: string;
  Imsak?: string;
  Midnight?: string;
}

interface NextPrayerProps {
  prayerTimes: PrayerTimes | null;
}

const NextPrayer: React.FC<NextPrayerProps> = ({ prayerTimes }) => {
  const [timeLeft, setTimeLeft] = useState<string>('');
  const [nextPrayerName, setNextPrayerName] = useState<string>('');

  const convertTimeToMinutes = useCallback((timeStr: string): number => {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
  }, []);

  useEffect(() => {
    if (!prayerTimes) return;

    const calculateTimeLeft = () => {
      const now = new Date();
      const currentTime = now.getHours() * 60 + now.getMinutes();

      // Convert prayer times to minutes since midnight
      const prayerTimesInMinutes = {
        Fajr: convertTimeToMinutes(prayerTimes.Fajr),
        Dhuhr: convertTimeToMinutes(prayerTimes.Dhuhr),
        Asr: convertTimeToMinutes(prayerTimes.Asr),
        Maghrib: convertTimeToMinutes(prayerTimes.Maghrib),
        Isha: convertTimeToMinutes(prayerTimes.Isha),
      };

      // Find the next prayer
      let nextPrayer: number | null = null;
      let nextPrayerName = '';

      // Check each prayer time to find the next one
      for (const [prayer, time] of Object.entries(prayerTimesInMinutes)) {
        if (time > currentTime) {
          nextPrayer = time;
          nextPrayerName = prayer;
          break;
        }
      }

      // If no prayer is found for today, use Fajr for the next day
      if (nextPrayer === null) {
        nextPrayer = prayerTimesInMinutes.Fajr + 24 * 60;
        nextPrayerName = 'Fajr (Tomorrow)';
      }

      // Calculate time difference in seconds
      const timeDiff = nextPrayer * 60 - (now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds());
      
      // Convert to hours, minutes, seconds
      const hours = Math.floor(timeDiff / 3600);
      const minutes = Math.floor((timeDiff % 3600) / 60);
      const seconds = timeDiff % 60;

      setNextPrayerName(nextPrayerName);
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    // Update immediately and then every second
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [prayerTimes, convertTimeToMinutes]);

  if (!prayerTimes) {
    return null;
  }

  return (
    <div className="bg-linear-to-r from-blue-600 to-blue-800 text-white rounded-lg p-6 shadow-lg">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Next Prayer</h2>
        <div className="text-4xl font-mono font-bold mb-2">{timeLeft}</div>
        <p className="text-xl">until {nextPrayerName}</p>
      </div>
    </div>
  );
};

export default NextPrayer;
