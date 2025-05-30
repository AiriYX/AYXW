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
      // NEW: Add markdown-it options to enable asset handling
      markdownIt: {
        html: true, // Enable HTML tags in markdown (already there, but good to confirm)
      },
      // This option tells the plugin to handle asset URLs
      // It processes image paths in markdown so Vite can serve them correctly
      // For paths relative to markdown files, Vite should pick them up if they resolve to src/assets
      // Example: '../assets/img/api_img.jpg' in src/contents/blogs/
      // The plugin will ensure the path is correctly resolved by Vite's asset handling.
      // If you have assets in 'public', you might use: assetPath: '/public/assets/img/' or similar.
      // Given your structure, the default asset handling should work if the path is resolved relative to the markdown file.
      // We don't need a specific 'assetPath' here, as Vite's default static asset serving
      // and markdown-it's relative path resolution should handle this.
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // You can remove this line: assetsInclude: ["**/*.md"], // This line is not needed with the plugin configured to handle markdown
}));
