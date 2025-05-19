module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  rules: {
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          Object: {
            message: '请使用 Record<string, unknown> 或其他更具体的类型',
          },
          // 允许使用 Function
          Function: false,
          // 允许使用 {}
          '{}': false,
        },
        extendDefaults: true, // 保留默认的限制
      },
    ],
  },
};
