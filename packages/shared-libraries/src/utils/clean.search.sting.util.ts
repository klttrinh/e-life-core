export function cleanSearchString(value: string) {
  // if % symbol is in the code prevent returning all data and change * to %
  let returnString = '';
  if (value) {
    returnString = value.trim().replace(/[%]/g, `\\%`).replace(/[*]/g, '%');
    return returnString;
  }
  return returnString;
}
