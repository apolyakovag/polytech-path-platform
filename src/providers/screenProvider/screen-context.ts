import { createContext, useContext } from "react";

interface ScreenContextProps {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const ScreenContext = createContext<ScreenContextProps | null>({
  isMobile: false,
  isTablet: false,
  isDesktop: false,
});

export const useScreenSize = () => {
  const context = useContext(ScreenContext);

  if (!context)
    throw new Error("useScreenSize must be used with in ScreenContext");
  return context;
};
