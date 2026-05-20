import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@/tokens": path.resolve(__dirname, "./src/tokens"),
      "@/styles": path.resolve(__dirname, "./src/styles"),
      "@/providers": path.resolve(__dirname, "./src/providers"),
      "@/layouts": path.resolve(__dirname, "./src/layouts"),
      "@/pages": path.resolve(__dirname, "./src/pages"),
      "@/shared": path.resolve(__dirname, "./src/shared"),
    },
  },
});
