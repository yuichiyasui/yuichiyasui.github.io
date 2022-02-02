/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "~": path.join(__dirname, "src"),
    },
  },
  build: {
    rollupOptions: {
      input: [resolve(__dirname, "index.html"), resolve(__dirname, "404.html")],
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
});
