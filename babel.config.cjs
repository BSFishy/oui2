const isTest = process.env.NODE_ENV === 'test';
const isProduction = process.env.NODE_ENV === 'production';

const assumptions = {
  setPublicClassFields: true,
};

const presets = [
  [
    '@babel/preset-env',
    {
      modules: process.env.BABEL_MODULES ? process.env.BABEL_MODULES : false,
      targets: !isTest ? undefined : {
        node: 'current',
      },
    },
  ],
  '@babel/preset-typescript',
];

const plugins = [
  ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
  ['@babel/plugin-proposal-class-properties'],
  process.env.ENABLE_EXTENSION_RESOLVER === 'true' && ['module-extension-resolver'],
].filter(Boolean);

module.exports = {
  assumptions,
  presets,
  plugins,
  include: [
    'src/**',
    'node_modules/lit/**',
    'node_modules/lit-element/**',
    'node_modules/lit-html/**',
    '.storybook/**',
  ],
  sourceMaps: true,
};
