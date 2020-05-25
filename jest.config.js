module.exports = {
  collectCoverageFrom: ['src/lib/**/*.{js,mjs}'],
  coverageDirectory: './coverage/',
  collectCoverage: true,
  moduleFileExtensions: ['js', 'mjs'],
  testMatch: ['**/?(*.)+(spec|test).mjs'],
  transform: {
    '^.+\\.m?js$': 'babel-jest',
  },
};
