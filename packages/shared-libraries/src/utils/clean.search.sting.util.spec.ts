import { cleanSearchString } from './clean.search.sting.util';

describe('clean search string', () => {
  /*
   * we get '*' from front-end as wildcard caracter
   * this should change to % for DB to understand
   * and we should escape '%' for security reason and prevent returning all information from DB
   */

  it('should test clean search string', () => {
    const resultA = cleanSearchString('*test*');
    expect(resultA).toEqual('%test%');

    const resultB = cleanSearchString('%');
    expect(resultB).toEqual('\\%');
  });
});
