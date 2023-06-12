import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json'; // Import the plugin
export default {
  input: './bpp/eunimartseller.js', // Specify the entry point of your package
  output: {
    file: 'bundle/bundle.js', // Specify the output file path
    format: 'cjs', // Specify the output format (e.g., 'umd', 'cjs')
    exports: 'named', // Specify the exports mode (e.g., 'default', 'named')
    globals: {}, // Specify global dependencies if needed
  },
  plugins: [
    resolve(), // Resolve Node.js modules
    // dynamicImportVars(), // Convert CommonJS modules to ES modules
    commonjs(),
    json(),
  ],
};