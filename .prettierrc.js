/** @type {import("prettier").Config} */
module.exports = {
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: 'es5',
  printWidth: 80,
  endOfLine: 'lf',
  importOrder: ['^react', '^@pinback/(.*)$', '^@/(.*)$', '^[./]'],
  plugins: ['prettier-plugin-tailwindcss'],
};
