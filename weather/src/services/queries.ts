import { useQuery } from '@tanstack/react-query';
import { 
  fetchCountriesByContinent, 
  fetchCitiesByCountry, 
  fetchPrayerTimes, 
  fetchPrayerMethods,
  type PrayerTime,
  type PrayerMethod,
  type Country
} from './api';

const COUNTRIES_QUERY_KEY = 'countries';
const CITIES_QUERY_KEY = 'cities';
const PRAYER_TIMES_QUERY_KEY = 'prayerTimes';
const PRAYER_METHODS_QUERY_KEY = 'prayerMethods';

export const useCountries = (continent: string) => {
  return useQuery<Country[]>({
    queryKey: [COUNTRIES_QUERY_KEY, continent],
    queryFn: () => fetchCountriesByContinent(continent),
    enabled: !!continent,
    staleTime: Infinity,
  });
};

export const useCities = (country: string) => {
  return useQuery<string[]>({
    queryKey: [CITIES_QUERY_KEY, country],
    queryFn: () => fetchCitiesByCountry(country),
    enabled: !!country,
    staleTime: Infinity,
  });
};

export const usePrayerTimes = (city: string, country: string, method: number) => {
  return useQuery<PrayerTime>({
    queryKey: [PRAYER_TIMES_QUERY_KEY, city, country, method],
    queryFn: () => fetchPrayerTimes(city, country, method),
    enabled: !!city && !!country && !!method,
    refetchInterval: 60000, 
  });
};

export const usePrayerMethods = () => {
  return useQuery<PrayerMethod[]>({
    queryKey: [PRAYER_METHODS_QUERY_KEY],
    queryFn: fetchPrayerMethods,
    staleTime: Infinity,
  });
};
