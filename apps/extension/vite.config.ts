// vite.config.ts
import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
import { crx } from '@crxjs/vite-plugin';
import manifest from './manifest.json';
import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths({
      projects: [resolve(__dirname, '../../tsconfig.json')],
    }),
    tailwindcss(),
    crx({ manifest }),
    svgSpritePlugin({
      iconDirs: ['../../packages/design-system/src/icons/source'],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],

  build: {
    outDir: 'dist',
    copyPublicDir: true,
  },
  publicDir: 'public',
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './src/api'),
      '@utils': resolve(__dirname, './src/utils'),
      '@constants': resolve(__dirname, './src/constants'),
      '@shared-types': resolve(__dirname, './src/types'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
