import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import external from 'rollup-plugin-peer-deps-external';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default {
  input: './test-layout.jsx',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs',
    // sourcemap: true,
  },
  plugins: [
    external(),
    resolve({ extensions: ['.js', '.jsx'] }),
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
      presets: [['@babel/preset-react', { "runtime": "automatic" }]],
      extensions: ['.js', '.jsx']
    }),
    // terser()
  ],
  external: ['react', 'react-dom']
};