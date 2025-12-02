import React from 'react';
import { useCountries, useCities } from '../services/queries';
import LoadingSpinner from './LoadingSpinner';

interface LocationSelectorProps {
  continent: string;
  setContinent: (value: string) => void;
  country: string;
  setCountry: (value: string) => void;
  city: string;
  setCity: (value: string) => void;
  method: string;
  setMethod: (value: string) => void;
  prayerMethods: Array<{ id: number; name: string }>;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  continent,
  setContinent,
  country,
  setCountry,
  city,
  setCity,
  method,
  setMethod,
  prayerMethods,
}) => {
  const { data: countries = [], isLoading: isLoadingCountries } = useCountries(continent);
  const { data: cities = [], isLoading: isLoadingCities } = useCities(country);

  const handleContinentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedContinent = e.target.value;
    setContinent(selectedContinent);
    setCountry('');
    setCity(''); 
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    setCity(''); 
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Continent Selector */}
      <div>
        <label htmlFor="continent" className="block text-sm font-medium text-gray-700 mb-1">
          Continent
        </label>
        <select
          id="continent"
          value={continent}
          onChange={handleContinentChange}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select Continent</option>
          <option value="Asia">Asia</option>
          <option value="Africa">Africa</option>
          <option value="Europe">Europe</option>
          <option value="Americas">Americas</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      {/* Country Selector */}
      <div>
        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
          Country
        </label>
        <div className="relative">
          <select
            id="country"
            value={country}
            onChange={handleCountryChange}
            disabled={!continent || isLoadingCountries}
            className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isLoadingCountries ? 'opacity-70' : ''
            }`}
          >
            <option value="">{isLoadingCountries ? 'Loading...' : 'Select Country'}</option>
            {countries.map((c) => (
              <option key={c.cca2} value={c.name.common}>
                {c.name.common}
              </option>
            ))}
          </select>
          {isLoadingCountries && (
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner size="sm" />
            </div>
          )}
        </div>
      </div>

      {/* City Selector */}
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
          City
        </label>
        <div className="relative">
          <select
            id="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            disabled={!country || isLoadingCities}
            className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              isLoadingCities ? 'opacity-70' : ''
            }`}
          >
            <option value="">{isLoadingCities ? 'Loading...' : 'Select City'}</option>
            {cities.map((cityName) => (
              <option key={cityName} value={cityName}>
                {cityName}
              </option>
            ))}
          </select>
          {isLoadingCities && (
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
              <LoadingSpinner size="sm" />
            </div>
          )}
        </div>
      </div>

      {/* Method Selector */}
      <div>
        <label htmlFor="method" className="block text-sm font-medium text-gray-700 mb-1">
          Calculation Method
        </label>
        <select
          id="method"
          value={method}
          onChange={(e) => setMethod(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {prayerMethods.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;