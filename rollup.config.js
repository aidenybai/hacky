import filesize from 'rollup-plugin-filesize';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/hacky.esm.js',
      format: 'esm',
    },
    {
      file: 'dist/hacky.esm.min.js',
      format: 'esm',
      plugins: [terser()],
    },
    {
      file: 'dist/hacky.cjs.js',
      format: 'cjs',
    },
    {
      file: 'dist/hacky.cjs.min.js',
      format: 'cjs',
      plugins: [terser()],
    },
  ],
  plugins: [
    typescript(),
    filesize({
      showBrotliSize: true,
      showGzippedSize: false,
      showMinifiedSize: false,
    }),
  ],
};
