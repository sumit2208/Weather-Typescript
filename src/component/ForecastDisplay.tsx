import React, { useEffect, useState } from "react";
import ForecastCard from "./ForecastCard";
import { Sun, CloudRain, Moon } from "lucide-react";
import axios from "axios";
import "./ForecastDisplay.css";

interface Forecast {
  day: string;
  icon: React.ReactNode;
  temperature: string;
}

const ForecastDisplay: React.FC = () => {
  const [forecastData, setForecastData] = useState<Forecast[]>([]);
  const [error, setError] = useState<string | null>(null);

  const apikey = "2b90dcbc772e49f9a1051120232008";  
  const city = "Paris";  

  useEffect(() => {
    const fetchForecast = async () => {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&q=${city}&days=7&aqi=no&alerts=no`;

      try {
        const response = await axios.get(url);
        const forecastDays = response.data.forecast.forecastday;

        // Map API data to forecastData format
        const mappedData = forecastDays.map((day: any) => {
          const date = new Date(day.date);
          const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
          const temp = ` ${day.day.avgtemp_c}°`;

          // Select an icon based on weather condition
          let icon: React.ReactNode;
          const condition = day.day.condition.text.toLowerCase();
          if (condition.includes("rain")) icon = <CloudRain size={32} />;
          else if (condition.includes("clear") || condition.includes("sun"))
            icon = <Sun size={32} />;
          else icon = <Moon size={32} />;

          return {
            day: dayName,
            icon,
            temperature: temp,
          };
        });

        setForecastData(mappedData);
        setError(null);
      } catch (err) {
        setError("Failed to fetch weather data. Please try again.");
        setForecastData([]);
      }
    };

    fetchForecast();
  }, []);

  return (
    <div className="forecast-container px-4 py-6 sm:px-6 lg:p-10 mt-8">
      {error ? (
        <div className="text-red-500 text-center">{error}</div>
      ) : (
        forecastData.map((forecast, index) => (
          <ForecastCard
            key={index}
            day={forecast.day}
            icon={forecast.icon}
            temperature={forecast.temperature}
          />
        ))
      )}
    </div>
  );
};

export default ForecastDisplay;
