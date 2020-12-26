module.exports = {
  hooks: {
    'pre-commit': 'yarn check-types && yarn lint --fix',
    'pre-push': 'yarn test:coverage',
  },
};
