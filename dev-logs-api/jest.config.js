const { createDefaultPreset } = require('ts-jest');

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
module.exports = {
  testEnvironment: 'node',
  // testMatch: ['**/**/*.test.ts'],
  roots: ['./tests'],
  setupFilesAfterEnv: ['./tests/BaseIT.ts'],
  verbose: true,
  forceExit: true,
  // clearMocks: true,
  transform: {
    ...tsJestTransformCfg,
  },
};
