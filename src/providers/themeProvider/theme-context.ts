import { createContext, useContext } from "react";
import type { Theme } from "./theme-constants";

export const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
} | null>(null);

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used with in ThemeProvider");
  return ctx;
}
