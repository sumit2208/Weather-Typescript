import { ChartArea, MoonIcon, Sun } from "lucide-react";
import UnitButton from "./UnitButton";
import axios from "axios";
import { useTheme } from "../theme-context";

export const Navbar = () => {
  const { theme, toggletheme } = useTheme();

  const apikey = "2b90dcbc772e49f9a1051120232008";
  const data = `https://api.weatherapi.com/v1/forecast.json?key=${apikey}&days=3&aqi=no&alerts=no&q=mumbai`;

  // Fetch the weather data
  axios
    .get(data)
    .then((res) => {
      console.log(res.data);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });

  return (
    <div
      className={`flex flex-col lg:flex-row items-center justify-between p-4 ${
        theme === "dark" ? "bg-[#121212] text-white" : "bg-[#F3F4F6] text-black"
      }`}
    >
      <span className="text-2xl font-bold font-serif indent-7 mt-2">WHETHERSA</span>
      <div className="flex gap-5 lg:mt-0">
        <UnitButton value="°F" />
        <UnitButton value="°C" />
        <ChartArea className="mt-1 cursor-pointer"/>
        {theme === "dark" ? (
          <Sun onClick={toggletheme} className="cursor-pointer mt-1" />
        ) : (
          <MoonIcon onClick={toggletheme} className="cursor-pointer mt-1" />
        )}
      </div>
    </div>
  );
};
