import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react({ jsxImportSource: '@emotion/react' })],
  publicDir: 'public',
  base: 'https://keemsebin.github.io/react-shopping-products/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      external: ['vitest'], // 혹은 expect 관련 테스트 종속성 제외
    },
  },
});
