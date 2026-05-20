import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UIKitProvider, getInitialClassName } from "@/providers";
import App from "./App";
import "./styles/fonts.css";
import "./tokens/index.css";
import "./styles/global.css";
import "borrom-ds-test/styles.css";

document.documentElement.className = getInitialClassName();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UIKitProvider>
      <App />
    </UIKitProvider>
  </StrictMode>
);



