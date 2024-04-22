const RuleOptions = {
  OFF: 'off',
  WARN: 'warn',
  ERROR: 'error',
};

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
    'plugin:react/recommended',
    // 'plugin:react/jsx-runtime',
    'prettier',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['@typescript-eslint', 'react'],
  rules: {
    'react/react-in-jsx-scope': RuleOptions.OFF,
    'react/prop-types': RuleOptions.OFF,
    '@typescript-eslint/no-unsafe-assignment': RuleOptions.WARN,
    '@typescript-eslint/no-unsafe-member-access': RuleOptions.WARN,
    '@typescript-eslint/no-misused-promises': RuleOptions.WARN,
    '@typescript-eslint/no-unused-vars': RuleOptions.WARN,
    '@typescript-eslint/no-empty-interface': RuleOptions.WARN,
    '@typescript-eslint/no-unsafe-call': RuleOptions.WARN,
    '@typescript-eslint/no-explicit-any': RuleOptions.WARN,
    "@typescript-eslint/no-floating-promises": RuleOptions.WARN
  },
};
