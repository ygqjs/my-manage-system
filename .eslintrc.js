module.exports = {
  root: true,
  env: {
    browser: true, // 支持浏览器环境变量（如 window）
    es2021: true, // 支持 ES2021 语法
    node: true, // 支持 Node.js 环境变量（如 process）
  },
  parser: '@babel/eslint-parser', // 使用 Babel 解析器支持现代 JavaScript 和 JSX
  parserOptions: {
    sourceType: 'module', // 支持 ES 模块
    ecmaFeatures: {
      jsx: true, // 支持 JSX 语法
    },
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['import', 'react'],
  settings: {
    react: {
      version: 'detect', // 自动检测 React 版本
    },
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          ['builtin', 'external'],
          ['internal', 'parent', 'sibling', 'index'],
        ],
        pathGroups: [
          { pattern: 'react', group: 'external', position: 'before' },
          { pattern: 'react-dom/**', group: 'external', position: 'before' },
          { pattern: 'antd', group: 'external', position: 'before' },
          { pattern: '@ant-design/**', group: 'external', position: 'before' },
          { pattern: '@components', group: 'parent', position: 'before' },
          { pattern: '@utils', group: 'parent', position: 'before' },
          { pattern: '@hooks', group: 'parent', position: 'before' },
          { pattern: '@/**', group: 'parent', position: 'before' },
          { pattern: './*.less', group: 'index', position: 'after' },
        ],
        'newlines-between': 'always',
        pathGroupsExcludedImportTypes: ['builtin'],
        alphabetize: { order: 'asc', caseInsensitive: true },
      },
    ],
    'no-debugger': 'error',
    // 检测已定义但未使用的变量
    'no-unused-vars': [
      'error',
      {
        vars: 'all', // 检查所有变量
        args: 'after-used', // 检查函数参数中最后一个使用后的未使用参数
        ignoreRestSiblings: true, // 忽略解构中的剩余变量（如 ...rest）
      },
    ],
    'react/jsx-uses-vars': 'error', // 添加此规则
    // 检测未定义却使用的变量
    'no-undef': 'error',
    // 确保 JSX 中的变量被正确标记为已使用，避免 no-unused-vars 误报
    'react/jsx-uses-vars': 'error',
  },
};
