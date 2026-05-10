import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: { stutz: "src/stutz.ts" },
    format: ["esm", "cjs"],
    outExtension: ({ format }) => ({ js: format === "esm" ? ".mjs" : ".cjs" }),
    dts: true,
    sourcemap: true,
    clean: false,
    target: "es2020",
    outDir: "dist",
  },
  {
    entry: { "stutz.standalone": "src/stutz.global.ts" },
    format: ["iife"],
    outExtension: () => ({ js: ".js" }),
    sourcemap: true,
    clean: false,
    minify: true,
    target: "es2020",
    outDir: "dist",
  },
]);
