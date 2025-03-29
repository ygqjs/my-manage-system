module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-enum': [0], // 禁用范围枚举检查
    'scope-case': [0], // 禁用范围大小写检查
    'subject-case': [0], // 禁用描述大小写检查
    'subject-empty': [2, 'never'], // 描述不能为空
    'type-empty': [2, 'never'], // 类型不能为空
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore',
        'revert',
        'build',
      ],
    ],
  },
};
