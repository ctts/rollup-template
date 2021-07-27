import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import eslint from '@rollup/plugin-eslint';
import filesize from 'rollup-plugin-filesize';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';

// 通用的插件
const basePlugins = [
  eslint({
    throwOnError: true, // lint 结果有错误将会抛出异常
    throwOnWarning: true,
    include: ['src/**/*.ts'],
    exclude: ['node_modules/**', 'dist/**'],
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
    // 只转换源代码，不运行外部依赖
    exclude: 'node_modules/**',
    // babel 默认不支持 ts 需要手动添加
  }),
  filesize()
];
// 开发环境需要使用的插件n
const devPlugins = [];
// 生产环境需要使用的插件
const prodPlugins = [
  terser()
];

const plugins = [...basePlugins].concat(isProd ? prodPlugins : devPlugins);
const destFilePath = isProd ? './dist/dist.min.js' : './dist/dist.js';


export default {
  input: 'src/index.ts',
  output: {
    file: destFilePath,
    sourcemap: true,
  },
  plugins
};
