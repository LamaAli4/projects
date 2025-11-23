import axios from 'axios';

const COUNTRIES_API = 'https://restcountries.com/v3.1/region';
const CITIES_API = 'https://countriesnow.space/api/v0.1/countries/cities';
const PRAYER_TIMES_API = 'https://api.aladhan.com/v1';

export interface Country {
  name: {
    common: string;
  };
  cca2: string;
}

export interface PrayerTime {
  code: number;
  status: string;
  data: {
    timings: {
      Fajr: string;
      Sunrise: string;
      Dhuhr: string;
      Asr: string;
      Sunset: string;
      Maghrib: string;
      Isha: string;
      Imsak: string;
      Midnight: string;
    };
    date: {
      readable: string;
      timestamp: string;
    };
    meta: {
      method: {
        id: number;
        name: string;
      };
    };
  };
}

export interface PrayerMethod {
  id: number;
  name: string;
  params: Record<string, number>;
}

export const fetchCountriesByContinent = async (continent: string): Promise<Country[]> => {
  try {
    const response = await axios.get<Country[]>(`${COUNTRIES_API}/${continent}`);
    return response.data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  } catch (error) {
    console.error('Error fetching countries:', error);
    throw error;
  }
};

export const fetchCitiesByCountry = async (country: string): Promise<string[]> => {
  try {
    const response = await axios.post<{ data: string[] }>(CITIES_API, { country });
    return response.data.data.sort();
  } catch (error) {
    console.error('Error fetching cities:', error);
    throw error;
  }
};

export const fetchPrayerTimes = async (
  city: string,
  country: string,
  method: number
): Promise<PrayerTime> => {
  try {
    const response = await axios.get<PrayerTime>(
      `${PRAYER_TIMES_API}/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching prayer times:', error);
    throw error;
  }
};

export const fetchPrayerMethods = async (): Promise<PrayerMethod[]> => {
  try {
    const response = await axios.get<{ data: Record<string, PrayerMethod> }>(
      `${PRAYER_TIMES_API}/methods`
    );
    return Object.values(response.data.data).sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error('Error fetching prayer methods:', error);
    throw error;
  }
};
