const { getJestConfig } = require('@storybook/test-runner');

const config = getJestConfig();

module.exports = {
  ...config,
  testPathIgnorePatterns: [
    ...(config.testPathIgnorePatterns || []),
    '<rootDir>/lib/',
  ],
};
