import path from 'path';
import dts from 'vite-plugin-dts';
import eslint from 'vite-plugin-eslint';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    eslint(),
    dts({
      exclude: ['**/*.d.ts', 'node_modules', 'dist', 'lib/utils'],
      skipDiagnostics: true,
      tsconfigPath: './tsconfig.dts.json',
    })
  ],
  test: {
    environment: 'happy-dom',
    coverage: {
      include: ['lib/']
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/jumplinks.ts'),
      name: 'jumplinks',
      fileName: (format) => `jumplinks.${format}.js`
    },
  }
});
