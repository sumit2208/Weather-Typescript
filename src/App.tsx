import ForecastDisplay from "./component/ForecastDisplay";
import HighlightDisplay from "./component/HightlightDisplay"; 
import Leftside from "./component/Leftside";
import { Navbar } from "./component/Navbar";
import { ThemeProvider } from "./theme-context";

export default function App() {
  return (
    <ThemeProvider>
      <div className="flex flex-col lg:flex-row px-4 lg:px-20 h-max">
        {/* Left Side */}
        <div className="w-full lg:w-[33%]">
          <Leftside />
        </div>
        {/* Right Side */}
        <div className="w-full lg:w-[67%]">
          <Navbar />
          <ForecastDisplay />
          <HighlightDisplay />
        </div>
      </div>
    </ThemeProvider>
  );
}
