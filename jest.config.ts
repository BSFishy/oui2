import type {Config} from 'jest';

const config: Config = {
    rootDir: '.',
    roots: [
        '<rootDir>/src/'
    ],
    coverageDirectory: '<rootDir>/reports/jest-coverage',
    coveragePathIgnorePatterns: ['/node_modules/', '.*\\.d\\.ts'],
    coverageReporters: ['lcov', 'text-summary'],
    moduleFileExtensions: [
        'ts',
        'js',
    ],
    testMatch: [
        '**/*.test.js',
        '**/*.test.ts',
    ],
    transform: {
        '^.+\\.(js|ts)$': 'babel-jest'
    },
};

export default config;
