const path = require('path');
const getGmailConfig = require('../src/utils/getGmailConfig');

jest.mock('path');

describe('Tests for getGmailConfig', () => {
  it('returns a config object', () => {
    path.resolve = jest.fn(arg => arg);
    expect(getGmailConfig()).toMatchSnapshot();
  });
});
