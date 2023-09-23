import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: process.env.SERVER_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
      "/cv/api": {
        target: process.env.CV_SERVER_URL,
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
