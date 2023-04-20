module.exports = api => {
  api.cache(true);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          targets: 'last 2 versions, not dead',
          modules: process.env.CJS ? 'commonjs' : false,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [['babel-plugin-add-import-extension', { extension: process.env.CJS ? 'cjs' : 'mjs' }]],
  };
};
