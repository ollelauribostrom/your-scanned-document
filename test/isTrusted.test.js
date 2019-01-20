const fs = require('fs');
const isTrusted = require('../src/utils/isTrusted');

jest.mock('fs');

describe('Tests for isTrusted', () => {
  it('resolves to true if from adress is trusted', async () => {
    fs.readFile = jest.fn((path, config, cb) => cb(null, JSON.stringify(['a', 'b'])));
    const trustedListPath = 'somePath';
    await expect(isTrusted('a', trustedListPath)).resolves.toEqual(true);
    expect(fs.readFile.mock.calls[0][0]).toEqual(trustedListPath);
  });
  it('resolves to false from adress is not trusted', async () => {
    fs.readFile = jest.fn((path, config, cb) => cb(null, JSON.stringify(['a', 'b'])));
    await expect(isTrusted('c', 'somePath')).resolves.toEqual(false);
  });
  it('rejects on errors', async () => {
    fs.readFile = jest.fn((path, config, cb) => cb(new Error()));
    await expect(isTrusted('c', 'somePath')).rejects.toThrowError();
  });
});
