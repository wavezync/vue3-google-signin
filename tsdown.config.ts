import { defineConfig } from "tsdown";
import Vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: { index: "./src/plugin.ts" },
  format: ["esm", "cjs"],
  platform: "neutral",
  plugins: [Vue({ isProduction: true })],
  dts: { vue: true },
  exports: true,
  publint: true,
  attw: { profile: "node16" },
  outputOptions: { exports: "named" },
});
