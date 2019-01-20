const fs = require('fs');
const lastHistoryId = require('../src/utils/lastHistoryId');

jest.mock('fs');

describe('Tests for lastHistoryId', () => {
  describe('.get', () => {
    it('resolves to the last saved history id', async () => {
      fs.readFile = jest.fn((path, cb) => cb(null, JSON.stringify({ id: 1001 })));
      const historyPath = 'history-path';
      await expect(lastHistoryId.get(historyPath)).resolves.toEqual(1001);
      expect(fs.readFile.mock.calls[0][0]).toEqual(historyPath);
    });
    it('resolves to null if no history id is saved', async () => {
      fs.readFile = jest.fn((path, cb) => cb(new Error()));
      await expect(lastHistoryId.get('history-path')).resolves.toBeNull();
    });
  });
  describe('.set', () => {
    it('saves the provided id as the last history id', async () => {
      fs.writeFile = jest.fn((path, data, config, cb) => cb(null));
      const id = 1002;
      const historypath = 'history-path';
      await lastHistoryId.set(1002, historypath);
      expect(fs.writeFile.mock.calls[0][0]).toEqual(historypath);
      expect(fs.writeFile.mock.calls[0][1]).toEqual(JSON.stringify({ id }));
    });
    it('rejects on errors', async () => {
      fs.writeFile = jest.fn((path, data, config, cb) => cb(new Error()));
      await expect(lastHistoryId.set('history-path')).rejects.toThrowError();
    });
  });
});
