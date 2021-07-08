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
      'no-console':  'off',
      'no-debugger':  'off',
      'no-unused-vars': 'off',
      'allowEmptyCatch': 0,
      "no-undef": 'off',
      "no-empty": 'off'
    },
    parserOptions: {
      parser: 'babel-eslint'
    }
  };