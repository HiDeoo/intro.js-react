module.exports = api => {
  const isTest = api.env('test');

  api.cache(true);

  const config = {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
          modules: process.env.CJS || isTest ? 'commonjs' : false,
        },
      ],
      '@babel/preset-react',
    ],
  };

  if (!isTest) {
    config.plugins = [['babel-plugin-add-import-extension', { extension: process.env.CJS ? 'cjs' : 'mjs' }]];
  }

  return config;
};
