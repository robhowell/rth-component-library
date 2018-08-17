module.exports = {
  extends: ['react-app', 'prettier', 'plugin:jest/recommended'],
  plugins: ['prettier', 'jest'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true
      }
    ]
  }
};
