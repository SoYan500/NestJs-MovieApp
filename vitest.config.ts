import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.ts'],
      exclude: ['src/**/*.spec.ts', 'src/**/*.d.ts']
    },
    setupFiles: ['./vitest.setup.ts']
  },
  resolve: {
    alias: {
      '@/': resolve(__dirname, './src')
    }
  }
});