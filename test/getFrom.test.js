const getFrom = require('../src/utils/getFrom');

describe('Tests for getFrom', () => {
  it('returns the senders email', () => {
    const mockHeaders = [
      {
        name: 'From',
        value: 'test user <test@gmail.com>',
      },
      {
        name: 'Subject',
        value: 'test',
      },
    ];
    expect(getFrom(mockHeaders)).toEqual('test@gmail.com');
  });
});
