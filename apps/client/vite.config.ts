import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import { resolve } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vite.dev/config/
export default defineConfig({
  // TODO: svg 설정 추가
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    svgSpritePlugin({
      iconDirs: ['../../packages/design-system/src/icons/source'],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
    visualizer({ filename: 'bundle-analysis.html', open: true }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '@api': resolve(__dirname, './src/api'),
      '@assets': resolve(__dirname, './src/assets'),
      '@utils': resolve(__dirname, './src/utils'),
      '@constants': resolve(__dirname, './src/constants'),
      '@shared-types': resolve(__dirname, './src/types'),
      '@components': resolve(__dirname, './src/components'),
    },
  },
});
