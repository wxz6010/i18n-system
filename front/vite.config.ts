import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoAppoint from "./plugins/auto-appoint";
import macro from "valtio/macro/vite";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), autoAppoint(), macro],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 3000,
  },
});
