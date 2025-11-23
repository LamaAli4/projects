import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import LocationSelector from "./components/LocationSelector";
import PrayerTimesTable from "./components/PrayerTimesTable";
import NextPrayer from "./components/NextPrayer";
import { usePrayerTimes, usePrayerMethods } from "./services/queries";
import LoadingSpinner from "./components/LoadingSpinner";

export interface PrayerTimings {
  Fajr: string;
  Dhuhr: string;
  Asr: string;
  Maghrib: string;
  Isha: string;
  Sunrise: string;
  Sunset: string;
  Imsak: string;
  Midnight: string;
}

export interface PrayerTimeResponse {
  data: {
    timings: PrayerTimings;
    date: {
      readable: string;
      timestamp: string;
    };
    meta: {
      method: {
        id: number;
        name: string;
        params: Record<string, number>;
      };
    };
  };
}

const queryClient = new QueryClient();

function App() {
  const [continent, setContinent] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [method, setMethod] = useState("4");

  const { data: prayerMethods = [] } = usePrayerMethods();
  const {
    data: prayerTimes,
    isLoading,
    error,
  } = usePrayerTimes(city, country, parseInt(method));

  useEffect(() => {
    if (prayerMethods.length > 0 && !method) {
      const defaultMethod = prayerMethods.find((m) => m.id === 4);
      if (defaultMethod) {
        requestAnimationFrame(() => {
          setMethod(defaultMethod.id.toString());
        });
      }
    }
  }, [prayerMethods, method]);

  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Prayer Times</h1>
            <p className="mt-2 text-lg text-gray-600">
              Find accurate prayer times for your location
            </p>
          </header>

          <main className="space-y-8">
            <LocationSelector
              continent={continent}
              setContinent={setContinent}
              country={country}
              setCountry={setCountry}
              city={city}
              setCity={setCity}
              method={method}
              setMethod={setMethod}
              prayerMethods={prayerMethods}
            />

            {isLoading && city && (
              <div className="flex justify-center items-center py-12">
                <div className="flex flex-col items-center gap-4">
                  <LoadingSpinner size="lg" color="border-blue-600" />
                  <p className="text-gray-600 text-sm">
                    Loading prayer times...
                  </p>
                </div>
              </div>
            )}

            {city && prayerTimes?.data?.timings && !isLoading && (
              <>
                <NextPrayer prayerTimes={prayerTimes.data.timings} />
                <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                  <div className="px-4 py-5 sm:px-6">
                    <h2 className="text-lg leading-6 font-medium text-gray-900">
                      Prayer Times
                    </h2>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                      {prayerTimes.data.date?.readable}
                    </p>
                  </div>
                  <div className="border-t border-gray-200">
                    <PrayerTimesTable
                      prayerTimes={prayerTimes.data.timings}
                      isLoading={isLoading}
                      error={error}
                    />
                  </div>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
