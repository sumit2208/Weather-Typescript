import { Clock, Cloud, MapPin, Search } from "lucide-react"; 
import React, { useEffect, useState } from "react";
import axios from "axios";

 
interface WeatherData {
  current: {
    temp_c: number;
    condition: { text: string };
  };
  location: {
    name: string;
    localtime: string;
  };
}

const Leftside: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const apikey = "2b90dcbc772e49f9a1051120232008";

  const fetchWeather = async (city: string) => {
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=3&aqi=no&alerts=no`;
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      setWeatherData(response.data);
      setError(null);
    } catch (err) {
      setError("Could not fetch weather data. Please try again.");
      setWeatherData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Fetch weather for Mumbai on component mount
    fetchWeather("Mumbai");
  }, []);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    fetchWeather(searchQuery);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };
 

  return (
    <div className="lg:p-4 sm:p-0" style={{ backgroundColor: "var(--bg-colors)" }}>
      <div className="flex flex-col lg:h-screen">
        {/* Search Bar */}
        <div className="mb-6 mt-5 lg:mt-0 px-5 lg:px-0">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full h-12 indent-4 rounded-2xl px-10 outline-none text-white"
              style={{ backgroundColor: "var(--bg-color)" }}
              placeholder="Search for place"
            />
            <Search
              className="absolute left-3 top-2.5 text-white cursor-pointer"
              onClick={handleSearch}
            />
            <MapPin
              className="absolute right-3 top-2.5 text-slate-400 cursor-pointer"
              onClick={() => fetchWeather("Mumbai")}
            />
          </div>
        </div>

        {/* Weather Icon and Temperature */}
        {isLoading ? (
          <div className="flex flex-col items-center text-white mb-6">
            <span>Loading...</span>
          </div>
        ) : weatherData ? (
          <div className="flex flex-col items-center text-white mb-6">
            
            <span className="text-5xl">{weatherData.current.temp_c}°C</span>
          </div>
        ) : (
          <div className="flex flex-col items-center text-white mb-6">
           
            <span className="text-5xl">--°C</span> {/* Default value */}
          </div>
        )}

        {/* Weather Details */}
        {weatherData ? (
          <div className="text-white">
            <div className="flex justify-between mb-2">
              <span className="font-bold">{weatherData.location.name}</span>
              <span>{new Date(weatherData.location.localtime).toDateString()}</span>
            </div>
            <div className="border-b border-gray-600 mb-2"></div>
            <div className="flex items-center gap-2">
              <Cloud />
              <span>{weatherData.current.condition.text}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Clock />
              <span>{weatherData.location.localtime.split(" ")[1]}</span>
            </div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : null}
      </div>
    </div>
  );
};

export default Leftside;
