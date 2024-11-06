import { defineConfig } from 'vite';
import  path  from 'path';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

export default defineConfig({
  plugins: [react(), tsconfigPaths(), nodePolyfills()],
   resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});