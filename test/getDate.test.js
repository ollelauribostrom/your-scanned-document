const getDate = require('../src/utils/getDate');

const RealDate = Date;

function mockDate({ year, month, date }) {
  global.Date = class extends RealDate {
    constructor() {
      super();
      this.setFullYear(year);
      this.setMonth(month);
      this.setDate(date);
    }
  };
}

describe('Tests for getDate', () => {
  it('returns todays date in yyyy-mm-dd format', () => {
    mockDate({ year: 2019, month: 0, date: 1 });
    expect(getDate()).toEqual('2019-01-01');
    mockDate({ year: 2019, month: 9, date: 31 });
    expect(getDate()).toEqual('2019-10-31');
  });
  afterAll(() => {
    global.Date = RealDate;
  });
});
