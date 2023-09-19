/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  test: { globals: true },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
