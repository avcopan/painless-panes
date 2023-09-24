import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
dotenv.config();

const proxyServers = {
  "/api": {
    target: process.env.SERVER_URL,
    changeOrigin: true,
    secure: false,
    ws: true,
  },
};

if (process.env.CV_SERVER_URL) {
  proxyServers["/cv/api"] = {
    target: process.env.CV_SERVER_URL,
    changeOrigin: true,
    secure: false,
    ws: true,
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: proxyServers,
  },
});
