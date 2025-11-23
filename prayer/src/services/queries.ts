import { useQuery } from "@tanstack/react-query";
import {
  fetchCountriesByContinent,
  fetchCitiesByCountry,
  fetchPrayerTimes,
  fetchPrayerMethods,
  type PrayerTime,
  type PrayerMethod,
  type Country,
} from "./api";

export const useCountries = (continent: string) => {
  return useQuery<Country[]>({
    queryKey: ["countries", continent],
    queryFn: () => fetchCountriesByContinent(continent),
    enabled: !!continent,
    staleTime: Infinity,
  });
};

export const useCities = (country: string) => {
  return useQuery<string[]>({
    queryKey: ["cities", country],
    queryFn: () => fetchCitiesByCountry(country),
    enabled: !!country,
    staleTime: Infinity,
  });
};

export const usePrayerTimes = (
  city: string,
  country: string,
  method: number
) => {
  return useQuery<PrayerTime>({
    queryKey: ["prayerTimes", city, country, method],
    queryFn: () => fetchPrayerTimes(city, country, method),
    enabled: !!city && !!country && !!method,
  });
};

export const usePrayerMethods = () => {
  return useQuery<PrayerMethod[]>({
    queryKey: ["prayerMethods"],
    queryFn: fetchPrayerMethods,
    staleTime: Infinity,
  });
};
