import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginRewriteAll from 'vite-plugin-rewrite-all';
import path from "path";

export default defineConfig({
  resolve: {
    extensions: [".js", ".ts", ".jsx"],
    alias: {
      "@public": path.resolve(__dirname, "public"),
      "@": path.resolve(__dirname, "src"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@components": path.resolve(__dirname, "src/components"),
      "@layout": path.resolve(__dirname, "src/layout"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@store": path.resolve(__dirname, "src/store"),
      "@screens": path.resolve(__dirname, "src/screens"),
    },
  },
  build: {
    minify: false,
  },
	server: { host: '0.0.0.0',
            port: 3000 },
  preview: { host: '0.0.0.0',
	     port: 3000 },
  plugins: [react(), pluginRewriteAll()],
});
