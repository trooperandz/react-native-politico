module.exports = {
  root: true,
  extends: ['prettier', '@react-native-community'],
  plugins: ['import', 'react-native'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        alias: {
          '@ph/app': './src/app',
          '@ph/assets': './src/assets',
          '@ph/comps': './src/components',
          '@ph/feats': './src/features',
          '@ph/navs': './src/navigations',
          '@ph/utils': './src/utils',
        },
      },
    },
  },
  ignorePatterns: ["**/__mocks__/**"],
  rules: {
    'react-native/no-unused-styles': 1,
    'react-hooks/exhaustive-deps': 'off',
  },
};
