interface HighlightProps {
    title:string,
    value:string,
} 


const HighlightCard: React.FC<HighlightProps> = ({ title, value }) => {
    return (
      <div className="flex flex-col items-center justify-center text-white rounded-xl p-4 inside_color" style={{ backgroundColor: 'var(--bg-colors)', width: '300px', height: '180px' }}>
        <span>{title}</span>
        <span>{value}</span>
      </div>
    );
  };
  
  export default HighlightCard;
  
