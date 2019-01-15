const getSlug = require('../src/utils/getSlug');

describe('Tests for getSlug', () => {
  it('generates a correct slug', () => {
    expect([
      getSlug('test title 1'),
      getSlug('Test Title 2'),
      getSlug('Test-Title 3'),
    ]).toEqual(['test-title-1', 'test-title-2', 'test-title-3']);
  });
});
