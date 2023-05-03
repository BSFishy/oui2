module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:@typescript-eslint/recommended',
    // Prettier options need to come last, in order to override other style
    // rules.
    // 'prettier',
    'plugin:prettier/recommended',
  ],
  plugins: [
    'prettier',
    // 'local',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: './tsconfig-lint.json',
  },
  rules: {
    'prefer-template': 'error',
    // 'local/i18n': 'error',
    // 'local/href-with-rel': 'error',
    // 'local/forward-ref': 'error',
    // 'local/require-license-header': [
    //   'error',
    //   {
    //     licenses: [OSD_NEW_HEADER, OSD_HEADER],
    //   },
    // ],
    'no-use-before-define': 'off',
    quotes: ['warn', 'single', 'avoid-escape'],
    camelcase: 'off',

    '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
    '@typescript-eslint/ban-types': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/indent': 'off',
    '@typescript-eslint/ban-tslint-comment': 'error',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-parameter-properties': 'off',
    '@typescript-eslint/no-triple-slash-reference': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    // It's all very well saying that some types are trivially inferrable,
    // but being explicit is still clearer.
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/naming-convention': 'off',
    '@typescript-eslint/ban-ts-comment': [
      'error',
      {
        'ts-ignore': 'allow-with-description',
        'ts-expect-error': 'allow-with-description',
      },
    ],
  }
}
