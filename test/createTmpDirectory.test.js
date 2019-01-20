const fs = require('fs');
const os = require('os');
const path = require('path');
const createTmpDirectory = require('../src/utils/createTmpDirectory');

jest.mock('fs');
jest.mock('os');
jest.mock('path');

describe('Tests for createTmpDirectory', () => {
  it('creates a temporary directory based on the os.tmpdir path', () => {
    fs.mkdtempSync = jest.fn(dir => dir);
    os.tmpdir = jest.fn(() => 'tmp-test');
    path.sep = '/';
    expect(createTmpDirectory()).toEqual('tmp-test/');
    expect(fs.mkdtempSync).toHaveBeenCalledTimes(1);
    expect(os.tmpdir).toHaveBeenCalledTimes(1);
  });
});
