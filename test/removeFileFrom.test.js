const fs = require('fs');
const path = require('path');
const removeFileFrom = require('../src/utils/removeFileFrom');

jest.mock('fs');
jest.mock('path');

describe('Tests for removeFileFrom', () => {
  it('returns a callable function to remove a file from the specified directory', () => {
    const removeFile = removeFileFrom('test');
    expect(typeof removeFile).toBe('function');
  });
  it('removes the file from the directory', async () => {
    const removeFile = removeFileFrom('test');
    path.join = jest.fn((...args) => args.join('/'));
    fs.unlink = jest.fn((_, cb) => cb(null));
    await removeFile({ filename: 'test-file.png' });
    expect(fs.unlink.mock.calls[0][0]).toEqual('test/test-file.png');
  });
  it('rejects on errors', async () => {
    const removeFile = removeFileFrom('test');
    path.join = jest.fn((...args) => args.join('/'));
    fs.unlink = jest.fn((_, cb) => cb(new Error()));
    await expect(removeFile({ filename: 'test-file.png' })).rejects.toThrowError();
  });
});
