/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/base.ts',

    include: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', '**/*.spec.tsx'],

    exclude: ['**/node_modules/**', '**/dist/**', '**/*.config.ts', '**/*.config.js', '**/*.d.ts', '**/src/types/**'],

    coverage: {
      reporter: ['text', 'lcov', 'html'],
      exclude: ['**/node_modules/**', '**/dist/**', '**/*.config.ts', '**/*.config.js', '**/*.d.ts', '**/src/types/**'],
    },
  },
});
