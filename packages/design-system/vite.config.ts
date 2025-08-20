import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgSpritePlugin({
      iconDirs: ['src/icons/source'],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@utils': path.resolve(__dirname, './src/utils'),
    },
  },
  build: {
    lib: {
      entry: 'src/components/index.ts',
      name: 'DesignSystem',
      fileName: (format) => `design-system.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});
