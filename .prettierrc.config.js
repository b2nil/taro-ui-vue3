// prettier.config.js or .prettierrc.js
module.exports = {
  semi: false,
  tabWidth: 2,
  singleQuote: true,
  trailingComma: "none",
  overrides: [
    {
      files: "*.vue",
      options: {
        wrapAttributes: true,
      }
    }
  ]
}