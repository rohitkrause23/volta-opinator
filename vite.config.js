import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        main:    resolve(import.meta.dirname, "index.html"),
        opi:     resolve(import.meta.dirname, "opi.html"),
        cartel:  resolve(import.meta.dirname, "cartel.html"),
        sistema: resolve(import.meta.dirname, "sistema.html"),
      },
    },
  },
  server: {
    port: 5173,
    open: true,
  },
});
