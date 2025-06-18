import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

interface ThemeColors {
   primary: string;
  secondary: string; // ✅ Adicionado
  accent: string;
  background: string;
  surface: string;
  card: string;
  text: string;
  textSecondary: string;
  border: string;
  error: string;
  success: string;
  warning: string;
  info: string;
}

interface Theme {
  isDark: boolean;
  colors: ThemeColors;
}

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const lightTheme: Theme = {
  isDark: false,
  colors: {
    primary: '#39BF24',
    secondary: '#F2C335',
    accent: '#9EBF26',
    background: '#FFFFFF',
    surface: '#F8F9FA',
    card: '#FFFFFF',
    text: '#1A1A1A',
    textSecondary: '#666666',
    border: '#E0E0E0',
    error: '#E74C3C',
    success: '#27AE60',
    warning: '#F39C12',
    info: '#3498DB',
  },
};

const darkTheme: Theme = {
 isDark: true,
  colors: {
    primary: '#39BF24',
    secondary: '#F2C335', 
    accent: '#9EBF26',
    background: '#121212',
    surface: '#1E1E1E',
    card: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#CCCCCC',
    border: '#404040',
    error: '#E74C3C',
    success: '#27AE60',
    warning: '#F39C12',
    info: '#3498DB',
  },
};



const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemColorScheme === 'dark');

  useEffect(() => {
    setIsDark(systemColorScheme === 'dark');
  }, [systemColorScheme]);

  const theme = isDark ? darkTheme : lightTheme;

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
export default ThemeProvider;