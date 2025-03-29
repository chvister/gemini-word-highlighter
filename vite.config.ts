import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    target: "esnext",

    rollupOptions: {
      input: {
        main: "./index.html",
        background: path.resolve(__dirname, "src/background/index.ts"),
      },
      output: {
        dir: "dist",
        entryFileNames: "[name].js",
      },
    },
  },
});
