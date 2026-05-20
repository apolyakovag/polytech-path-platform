import { useMemo, type ReactNode } from "react";
import { ScreenContext } from "./screen-context";
import { useMediaQuery } from "usehooks-ts";

export function ScreenProvider({ children }: { children: ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 512px)");
  const isTablet = useMediaQuery("(min-width: 513px) and (max-width: 999px)");
  const isDesktop = useMediaQuery("(min-width: 1000px)");

  const screenSize = useMemo(
    () => ({
      isMobile,
      isTablet,
      isDesktop,
    }),
    [isDesktop, isMobile, isTablet]
  );

  return (
    <ScreenContext.Provider value={screenSize}>
      {children}
    </ScreenContext.Provider>
  );
}



