import { crx } from '@crxjs/vite-plugin';
import svgSpritePlugin from '@pivanov/vite-plugin-svg-sprite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import manifest from './manifest.json';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  const dynamicManifest = {
    ...manifest,
    name: env.VITE_EXTENSION_NAME || manifest.name,
  };

  return {
    define: {
      __ALLOWED_ORIGINS__: JSON.stringify(
        env.VITE_ALLOWED_ORIGINS?.split(',') || []
      ),
    },

    plugins: [
      react(),
      tsconfigPaths({
        projects: [resolve(__dirname, './tsconfig.json')],
      }),
      tailwindcss(),
      crx({ manifest: dynamicManifest }),
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

    server: {
      port: 5175,
      strictPort: true,
    },
  };
});
