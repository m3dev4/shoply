import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api/": "https://potential-train-wr9r54jwjxwjhx6r-8080.app.github.dev/",
      "/upload":
        "https://potential-train-wr9r54jwjxwjhx6r-8080.app.github.dev/",
    },
  },
});
