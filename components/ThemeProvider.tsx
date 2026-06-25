"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = "light" | "dark" | "system";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: "light" | "dark";
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("fixin-theme") as Theme | null;
    const initialTheme = stored || "light";
    
    setThemeState(initialTheme);
    
    const resolved = initialTheme === "system" ? getSystemTheme() : initialTheme;
    setResolvedTheme(resolved);
    
    // Apply immediately
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
    
    setMounted(true);
  }, []);

  // Update theme when it changes
  useEffect(() => {
    if (!mounted) return;
    
    const resolved = theme === "system" ? getSystemTheme() : theme;
    setResolvedTheme(resolved);
    
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(resolved);
    localStorage.setItem("fixin-theme", theme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted) return;
    
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        const resolved = e.matches ? "dark" : "light";
        setResolvedTheme(resolved);
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(resolved);
      }
    };
    
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [theme, mounted]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, resolvedTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
