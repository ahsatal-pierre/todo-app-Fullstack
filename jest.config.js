module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    roots: ['<rootDir>/client', '<rootDir>/server'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
      },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.jsx?$',
    moduleFileExtensions: ['js', 'jsx'],
  };
  