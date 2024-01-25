// jest.config.js
module.exports = {
    collectCoverage: true,
    collectCoverageFrom: ['src/**/*.js'],
    coveragePathIgnorePatterns: ['node_modules', 'dist'],
    setupFilesAfterEnv: ['./setupTests.js'],
    silent: true,
};
