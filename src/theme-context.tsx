import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Define types for the context value
interface ThemeContextType {
  theme: "dark" | "light"; // Only these two possible values for theme
  toggletheme: () => void; // Function to toggle the theme
}

// Create the ThemeContext with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook to use the ThemeContext
export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Define the props for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode; // This allows any valid JSX as children
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isdark, setdark] = useState<boolean>(false);

  const toggletheme = () => {
    setdark((prevState) => !prevState);
  };

  const theme = isdark ? "dark" : "light";

  // Update the document theme when `isdark` changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [isdark, theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggletheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
