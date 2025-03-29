module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  parserOptions: {
    sourceType: 'module',
    requireConfigFile: false,
    babelOptions: {
      presets: ['@babel/preset-react'],
    },
  },
  plugins: ['import', 'react'],
  settings: {
    react: {
      version: 'detect',
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
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'after-used', ignoreRestSiblings: true },
    ],
    'react/jsx-uses-vars': 'error', // 添加此规则
  },
};
