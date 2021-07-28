import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import eslint from '@rollup/plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import cleaner from 'rollup-plugin-cleaner';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';
const distPath = './dist/'

// 通用的插件
const basePlugins = [
  cleaner({
    targets: [distPath]
  }),
  eslint({
    throwOnError: true, // lint 结果有错误将会抛出异常
    throwOnWarning: true,
    include: ['src/**/*.ts'],
  }),
  commonjs(),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  typescript(),
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**',
  }),
  filesize()
];
// 开发环境需要使用的插件
const devPlugins = [];
// 生产环境需要使用的插件
const prodPlugins = [
  terser()
];

const plugins = [...basePlugins].concat(isProd ? prodPlugins : devPlugins);
const destFilePath = distPath + (isProd ? 'dist.min.js' : 'dist.js');


export default {
  input: 'src/index.ts',
  output: {
    file: destFilePath,
    sourcemap: true,
  },
  plugins
};
