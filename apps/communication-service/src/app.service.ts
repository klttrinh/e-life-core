import { Injectable } from '@nestjs/common';
import { getCountryCallingCode, getCountries, CountryCallingCode } from 'libphonenumber-js';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello communication service!';
  }

  splitPhoneNumber(phoneNumber: string) {
    function getAllCountryCodes(): string[] {
      const countries = getCountries();
      return countries.map((country) => {
        const countryCode = getCountryCallingCode(country);
        return countryCode.startsWith('+') ? countryCode.slice(1) : countryCode;
      });
    }
    const countryCodes = getAllCountryCodes();
    let normalizedNumber = phoneNumber.startsWith('+') ? phoneNumber.slice(1) : phoneNumber;
    normalizedNumber = normalizedNumber.replace(/^0+/, '');

    let countryCode = null;
    for (const code of countryCodes) {
      if (normalizedNumber.startsWith(code)) {
        countryCode = code;
        break;
      }
    }
    if (countryCode) {
      countryCode = countryCode.replace(/^0+/, '');
      normalizedNumber = normalizedNumber.slice(countryCode.length);
    }
    normalizedNumber = normalizedNumber.replace(/^0+/, '');

    return countryCode ? `${countryCode}${normalizedNumber}` : normalizedNumber;
  }
}
