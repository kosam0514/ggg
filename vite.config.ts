
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // GitHub Pages 배포 시 레포지토리 이름이 포함된 URL에서도 작동하도록 base를 './'로 설정
  base: './',
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  }
});
