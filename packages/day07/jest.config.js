/** @type {import('ts-jest').JestConfigWithTsJest} **/
module.exports = {
  'testEnvironment': 'node',
  testMatch: [
    "src/**/__tests__/**/*.[jt]s?(x)",
    "**/src/**/?(*.)+(spec|test).[jt]s?(x)"
  ],
  'transform': {
    '^.+.tsx?$': ['ts-jest', {}]
  }
};
