export const TOKEN_CLASSES =
  "Value spacings typography TypoComponent br-md br_size";
export const THEME_LIGHT = "themes_light";
export const THEME_DARK = "themes_dark";
const THEME_STORAGE_KEY = "ui-kit-color-theme";

export type Theme = "light" | "dark";

const isTheme = (value: string | null): value is Theme =>
  value === "light" || value === "dark";

const reportStorageError = (action: "read" | "write", error: unknown) => {
  if (import.meta.env.DEV) {
    console.warn(`[theme] Failed to ${action} localStorage theme value`, error);
  }
};

export const getSystemTheme = (): Theme => {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

export const getStoredTheme = (): Theme | null => {
  if (typeof window === "undefined") return null;

  try {
    const theme = window.localStorage.getItem(THEME_STORAGE_KEY);
    return isTheme(theme) ? theme : null;
  } catch (error) {
    reportStorageError("read", error);
    return null;
  }
};

export const saveTheme = (theme: Theme) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch (error) {
    reportStorageError("write", error);
  }
};

export const getInitialTheme = (): Theme =>
  getStoredTheme() ?? "dark";

export const getThemeClass = (theme: Theme) =>
  theme === "light" ? THEME_LIGHT : THEME_DARK;

export const getInitialClassName = () =>
  `${TOKEN_CLASSES} ${getThemeClass(getInitialTheme())}`;
