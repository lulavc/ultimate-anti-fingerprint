import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const isDevelopment = process.env.NODE_ENV === 'development';

const banner = `/*!
 * Ultimate Anti-Fingerprint v2.0.0
 * Advanced anti-fingerprinting library for protecting user privacy
 * 
 * Copyright (c) 2025 lulavc
 * Licensed under MIT License
 * 
 * https://github.com/lulavc/ultimate-anti-fingerprint
 */`;

const userscriptHeader = `// ==UserScript==
// @name         Ultimate Anti-Fingerprint
// @namespace    https://greasyfork.org/users/your-username
// @version      2.0.0
// @description  Advanced anti-fingerprinting: Chrome/Windows spoof, font, plugin, WebGL, canvas, and cookie protection
// @author       lulavc
// @match        *://*/*
// @license      MIT
// @locale       en
// @downloadURL https://update.greasyfork.org/scripts/543036/Ultimate%20Anti-Fingerprint.user.js
// @updateURL https://update.greasyfork.org/scripts/543036/Ultimate%20Anti-Fingerprint.meta.js
// ==/UserScript==

`;

export default [
  // ES Module build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      banner,
      sourcemap: !isDevelopment
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json',
        declaration: true,
        declarationDir: './dist'
      })
    ],
    external: []
  },

  // CommonJS build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      banner,
      sourcemap: !isDevelopment,
      exports: 'auto'
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ],
    external: []
  },

  // UMD build for browsers
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/ultimate-anti-fingerprint.js',
      format: 'umd',
      name: 'UltimateAntiFingerprint',
      banner,
      sourcemap: !isDevelopment
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  },

  // Minified UMD build
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/ultimate-anti-fingerprint.min.js',
      format: 'umd',
      name: 'UltimateAntiFingerprint',
      banner,
      sourcemap: true
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      }),
      terser({
        compress: {
          drop_console: false,
          drop_debugger: true
        },
        format: {
          comments: /^!/
        }
      })
    ]
  },

  // Userscript build
  {
    input: 'src/userscript.ts',
    output: {
      file: 'dist/ultimate-anti-fingerprint.user.js',
      format: 'iife',
      banner: userscriptHeader,
      sourcemap: false
    },
    plugins: [
      resolve({ browser: true }),
      commonjs(),
      typescript({
        tsconfig: './tsconfig.json'
      })
    ]
  }
];