import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  // The library (workspace link to ../dist) must share the fixture's Vue.
  resolve: { dedupe: ["vue"] },
});
