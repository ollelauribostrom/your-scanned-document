const getGmailConfig = require('../src/utils/getGmailConfig');

describe('Tests for getGmailConfig', () => {
  it('returns a config object', () => {
    expect(getGmailConfig()).toMatchSnapshot();
  });
});
