import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isLibraryMode = process.env.BUILD_MODE === 'library';

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ...(isLibraryMode && {
      define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
      },
      build: {
        lib: {
          entry: path.resolve(__dirname, 'src/embed.tsx'),
          name: 'RockPopup',
          fileName: (format) => `rock-popup.${format}.js`,
          formats: ['umd', 'es'],
        },
        rollupOptions: {
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
            assetFileNames: 'rock-popup.[ext]',
          },
        },
        cssCodeSplit: false,
      },
    }),
  };
});
