import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";

interface WeatherData {
  location: string;
  temperature: string;
  condition: string;
  icon: string;
  date: string;
  time: string;
}

interface WeatherContextType {
  weather: WeatherData | null;
  loading: boolean;
}

const WeatherContext = createContext<WeatherContextType | undefined>(undefined);

export const useWeather = (): WeatherContextType => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};

export const WeatherProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const apikey = "2b90dcbc772e49f9a1051120232008";
  const dataURL = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&days=3&aqi=no&alerts=no&q=mumbai`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(dataURL);
        const data = response.data;
        setWeather({
          location: data.location.name,
          temperature: `${data.current.temp_c}°C`,
          condition: data.current.condition.text,
          icon: data.current.condition.icon,
          date: data.location.localtime.split(" ")[0],
          time: data.location.localtime.split(" ")[1],
        });
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <WeatherContext.Provider value={{ weather, loading }}>
      {children}
    </WeatherContext.Provider>
  );
};
