import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    server: {
      // next-intl ships ESM that imports "next/navigation" without an
      // extension. Node's resolver refuses that inside node_modules, and the
      // alias below only applies to what Vite transforms, so next-intl has to
      // be transformed rather than loaded as-is.
      deps: { inline: ['next-intl'] },
    },
  },
  resolve: {
    alias: [
      { find: /^@\//, replacement: new URL('./src/', import.meta.url).pathname },
      // next-intl's client navigation imports "next/navigation" without an
      // extension, and the next package declares no exports map, so Vite's ESM
      // resolver cannot find it inside node_modules. Next itself resolves this
      // through its own bundler; here it has to be spelled out.
      { find: /^next\/navigation$/, replacement: 'next/navigation.js' },
    ],
  },
});
