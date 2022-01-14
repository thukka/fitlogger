/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  testEnvironment: 'node',
  "testPathIgnorePatterns": [
    "src",
    "build"
  ],
  globalTeardown: './test-teardown-globals.js'
};