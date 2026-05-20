import { type ReactNode } from "react";
import { ScreenProvider } from "./screenProvider";
import { ThemeProvider } from "./themeProvider";

export interface KitProviderProps {
  children: ReactNode;
  withScreenProvider?: boolean;
  withThemeProvider?: boolean;
}

export function UIKitProvider({
  children,
  withScreenProvider = true,
  withThemeProvider = true,
}: KitProviderProps) {
  return withScreenProvider ? (
    <ScreenProvider>
      {withThemeProvider ? <ThemeProvider>{children}</ThemeProvider> : children}
    </ScreenProvider>
  ) : withThemeProvider ? (
    <ThemeProvider>{children}</ThemeProvider>
  ) : (
    children
  );
}



