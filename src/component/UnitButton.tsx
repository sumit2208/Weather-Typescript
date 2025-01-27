interface UnitButtonProps {
    value: string;
  }
  
  const UnitButton: React.FC<UnitButtonProps> = ({ value }) => {
    return (
      <div>
        <div
          className="h-8 w-8 rounded-full text-center cursor-pointer flex items-center justify-center flex-wrap inside_color" 
          style={{ backgroundColor: 'var(--bg-colors)'}}
        >
          {value}
        </div>
      </div>
    );
  };
  
  export default UnitButton;
  