import { ReactNode } from "react";

interface ForecastCardProps {
  day: string;
  icon: ReactNode;
  temperature: string;
}

const ForecastCard: React.FC<ForecastCardProps> = ({ day, icon, temperature }) => {
  return (
    <div className="flex flex-col items-center justify-center text-white rounded-xl p-4 w-[280px] sm:w-[320px] lg:w-[400px] inside_color" style={{ backgroundColor: 'var(--bg-colors)' }}>
      <span className="text-lg font-bold">{day}</span>
      <div className="my-4">{icon}</div>
      <span className="text-xl font-semibold">{temperature}</span>
    </div>
  );
};

export default ForecastCard;

