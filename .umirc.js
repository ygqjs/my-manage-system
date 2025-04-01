import { defineConfig } from '@umijs/max';
import EslintWebpackPlugin from 'eslint-webpack-plugin';
import { resolve } from 'path';
import routes from './src/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {},
  layout: {
    title: '@umijs/max',
  },
  routes,
  npmClient: 'pnpm',
  chainWebpack(config) {
    config
      .plugin('eslint-webpack-plugin')
      .use(EslintWebpackPlugin, [
        {
          extensions: ['js', 'jsx', 'ts', 'tsx'], // 检查的文件类型
          context: resolve(__dirname, 'src'), // 只扫描 src 目录
          exclude: [
            'node_modules',
            'dist',
            'mfsu-virtual-entry', // 排除 MFSU 虚拟目录
            '**/.umi/', // 递归排除所有 .umi 目录
            '**/.umi-production/',
          ],
          eslintPath: require.resolve('eslint'), // 指定 ESLint 路径
          fix: true, // 自动修复部分问题
          emitWarning: true, // 将警告输出到构建日志
          emitError: true, // 将错误输出到构建日志
        },
      ])
      .end();
  },
  alias: {
    '@': resolve(__dirname, './src'),
  },
  verifyCommit: {
    disable: true, // 禁用提交信息检查
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8080',
      changeOrigin: true,
      pathRewrite: { '^/api': '/' },
    },
  },
});
