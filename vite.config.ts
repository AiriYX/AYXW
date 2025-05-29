import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Change this line:
// import Markdown from "vite-plugin-markdown";
// To this:
import vitePluginMarkdown from "vite-plugin-markdown"; // Use default import

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    vitePluginMarkdown(), // Call the named import function
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // You can remove this line if it's still there: assetsInclude: ["**/*.md"],
}));
