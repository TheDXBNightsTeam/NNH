import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the context type
interface AppContextType {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  isMobileView: boolean;
}

// Create the context with default values
const AppContext = createContext<AppContextType | undefined>(undefined);

// Provider component
export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Menu state
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Theme state
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>(() => {
    // Get theme from localStorage or use system default
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | 'system';
    return savedTheme || 'system';
  });
  
  // Mobile view state
  const [isMobileView, setIsMobileView] = useState(false);
  
  // Update theme in localStorage and apply it
  useEffect(() => {
    localStorage.setItem('theme', theme);
    
    // Apply theme to document
    const isDark = 
      theme === 'dark' || 
      (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    document.documentElement.classList.toggle('dark', isDark);
  }, [theme]);
  
  // Check for mobile view
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobileView(window.innerWidth < 768);
    };
    
    // Initial check
    checkIsMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIsMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Context value
  const value = {
    isMenuOpen,
    setIsMenuOpen,
    theme,
    setTheme,
    isMobileView
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};