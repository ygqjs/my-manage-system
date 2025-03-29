import { defineConfig } from '@umijs/max';
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
  alias: {
    '@/src': 'src', // 将 @/src 映射到 src 目录
  },
  verifyCommit: {
    disable: true, // 禁用提交信息检查
  },
});
