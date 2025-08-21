import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';

// https://vite.dev/config/
export default defineConfig({
  // TODO: svg 설정 추가
  plugins: [
    react(),
    tsconfigPaths(),
    tailwindcss(),
    svgSpritePlugin({
      iconDirs: ['src/icons/source'],
      symbolId: 'icon-[name]',
      inject: 'body-last',
    }),
  ],
});
