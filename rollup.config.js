import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

const isProd = process.env.NODE_ENV === 'production';

// 通用的插件
const basePlugins = [
  typescript(),
  resolve({
    jsnext: true,
    main: true,
    browser: true
  }),
  commonjs(),
  babel()
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
