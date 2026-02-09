import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    proxy: {
      // Proxy ТОЛЬКО для SSE endpoint
      "/api/v2/alert/sse": {
        target: "https://nordwibe.com",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },
});
