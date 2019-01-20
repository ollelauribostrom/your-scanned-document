const fs = require('fs');
const getGmailCredentials = require('../src/utils/getGmailCredentials');

jest.mock('fs');

describe('Tests for getGmailCredentials', () => {
  it('returns a credentials object', async () => {
    fs.readFile = jest.fn((path, cb) => cb(null, JSON.stringify({
      installed: {
        client_id: 'test-id',
        client_secret: 'test-secret',
        redirect_uris: ['uri1', 'uri2'],
      },
    })));
    const credentialsPath = './env/credentials.json';
    const credentials = await getGmailCredentials(credentialsPath);
    expect(credentials).toEqual({
      clientId: 'test-id',
      clientSecret: 'test-secret',
      redirectUris: ['uri1', 'uri2'],
    });
    expect(fs.readFile.mock.calls[0][0]).toEqual(credentialsPath);
  });
  it('rejects the promise on errors', async () => {
    fs.readFile = jest.fn((path, cb) => cb(new Error()));
    const credentialsPath = './env/credentials.json';
    await expect(getGmailCredentials(credentialsPath)).rejects.toThrowError();
  });
});
