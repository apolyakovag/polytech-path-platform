import {
  useCallback,
  useLayoutEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { ThemeContext } from "./theme-context";
import {
  TOKEN_CLASSES,
  getInitialTheme,
  getThemeClass,
  saveTheme,
  type Theme,
} from "./theme-constants";

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.className = `${TOKEN_CLASSES} ${getThemeClass(theme)}`;
  }, [theme]);

  const setTheme = useCallback((next: Theme) => {
    saveTheme(next);
    setThemeState(next);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "light" ? "dark" : "light";
      saveTheme(next);
      return next;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, setTheme, toggleTheme }),
    [theme, setTheme, toggleTheme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}



