import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom", // Use happy-dom instead of jsdom
    globals: true, // Enable Jest-like globals (e.g., expect, vi.fn)
    transformMode: {
      web: [/.[jt]sx?$/], // Ensure JS/TSX files are transformed
    },
    deps: {
      inline: [
        "d3",
        "d3-array",
        "internmap",
        "delaunator",
        "robust-predicates",
      ], // Prevents transform issues
    },
    alias: {
      d3: "d3/dist/d3.js", // Ensure D3 is properly resolved
    },
  },
});
