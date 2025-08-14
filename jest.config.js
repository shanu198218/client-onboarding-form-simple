const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

const customConfig = {
  testEnvironment: 'node', 
  testMatch: [
    '**/__tests__/**/*.(test|spec).[jt]s?(x)',
    '**/?(*.)+(test|spec).[jt]s?(x)',
  ],
  moduleFileExtensions: ['ts','tsx','js','jsx'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

module.exports = createJestConfig(customConfig);
