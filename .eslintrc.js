module.exports = {
    root: true,
    env: {
      node: true
    },
    'extends': [
      'plugin:vue/strongly-recommended',
      'eslint:recommended'
    ],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
      'no-unused-vars': 'off',
      'allowEmptyCatch': 0,
      "no-undef": 'off',
      "no-empty": 'off'
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  };