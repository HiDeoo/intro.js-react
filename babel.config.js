module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: '> 0.5%, last 2 versions, Firefox ESR, not dead',
          modules: process.env.CJS ? 'commonjs' : false,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [['babel-plugin-add-import-extension', { extension: process.env.CJS ? 'cjs' : 'mjs' }]],
  };
};
