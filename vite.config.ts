import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      outDir: "build",
    },
    resolve: {
      alias: {
        "@views": path.resolve(__dirname, "./src/views"),
      },
    },
  };
});
