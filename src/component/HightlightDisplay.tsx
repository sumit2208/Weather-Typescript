import HighlightCard from "./HighlightCard";

const HighlightDisplay = () => {
  const HighlightData = Array(6).fill({ title: "UV INDEX", value: "4" });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-2  px-10 mt-6  sm:w-full">
      {HighlightData.map((highlight, index) => (
        <HighlightCard
          key={index}
          title={highlight.title}
          value={highlight.value}
        />
      ))}
    </div>
  );
};



export default HighlightDisplay;
