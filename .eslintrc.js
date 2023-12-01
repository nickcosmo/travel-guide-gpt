module.exports = {
  env: {
    node: true,
    'vue/setup-compiler-macros': true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    // "eslint:recommended",
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // override/add rules settings here, such as:
    'vue/no-unused-vars': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
  },
};
