import type {Config} from 'jest';
 
const config: Config = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/src/setup.jest.ts'],
    testEnvironment: 'jsdom',
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    testMatch: ['**/+(*.)+(spec).+(ts)'],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@pages/(.*)$': '<rootDir>/src/app/pages/$1',
        '^@core/(.*)$': '<rootDir>/src/app/core/$1',
        '^@layouts/(.*)$': '<rootDir>/src/app/layouts/$1',
        '^@features/(.*)$': '<rootDir>/src/app/features/$1',
        '^@components/(.*)$': '<rootDir>/src/app/components/$1',
        '^@shared/(.*)$': '<rootDir>/src/app/shared/$1',
    },
};

export default config;
