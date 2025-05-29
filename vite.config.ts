import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Corrected import: Use named import for 'plugin' and 'Mode'
import { plugin as markdownPlugin, Mode } from "vite-plugin-markdown";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    // Call the aliased plugin function and specify the modes you need
    markdownPlugin({
      mode: [Mode.HTML, Mode.MARKDOWN], // Explicitly request HTML and Markdown content
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // You can remove this line: assetsInclude: ["**/*.md"],
}));
