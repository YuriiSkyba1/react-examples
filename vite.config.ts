import { type ConfigEnv, defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vite.dev/config/
const config = ({ mode }: ConfigEnv): ReturnType<typeof defineConfig> => {
  const { VITE_APP_DEVELOPMENT_PORT } = loadEnv(mode, process.cwd());

  return defineConfig({
    build: {
      outDir: 'build',
    },
    server: {
      port: Number(VITE_APP_DEVELOPMENT_PORT),
      open: true,
    },
    plugins: [react(), tailwindcss(), tsconfigPaths(), svgr()],
    resolve: {
      alias: [
        {
          find: '@assets',
          replacement: fileURLToPath(new URL('./src/assets', import.meta.url)),
        },
      ],
    },
  });
};

export default config;
