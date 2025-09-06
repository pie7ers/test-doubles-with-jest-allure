import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testRunner: 'jest-circus/runner',
  testEnvironment: 'jest-allure2-reporter/environment-node',
  reporters: [
    'default',
    ['jest-allure2-reporter', { resultsDir: 'reports/allure-results' }]
  ],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  verbose: true
};

export default config;
