module.exports = {
  semi: true,
  singleQuote: true,
  printWidth: 80,
  overrides: [
    {
      files: '*.sol',
      options: {
        parser: 'solidity-parse',
      },
    },
  ],
};
