module.exports = {
  preset: '@metamask/snaps-jest',
  testTimeout: 60000,
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};
