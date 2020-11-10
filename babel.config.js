module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        cwd: 'babelrc',
        root: ['./src'],
        extensions: ['.js', '.ts', '.tsx', '.json'],
        alias: {
          '@ph/app': './src/app',
          '@ph/assets': './src/assets',
          '@ph/comps': './src/components',
          '@ph/feats': './src/features',
          '@ph/navs': './src/navigations',
          '@ph/utils': './src/utils',
        },
      },
    ],
  ],
};
