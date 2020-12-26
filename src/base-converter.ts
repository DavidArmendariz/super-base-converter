import { lettersToNumbersMap } from './constants/letters-to-numbers-map';
import { inverseObject } from './utils/inverse-object';

export class BaseConverter {
  private numbersToLettersMap;
  constructor() {
    this.numbersToLettersMap = inverseObject(lettersToNumbersMap);
  }
  convertFromBaseNToDecimal(numberToConvert: string, baseFrom: number): number {
    // 1101 (binary) -> 2^3 * 1 + 2^2 * 1 + 2^1 * 0 + 2^0 * 1 = 8 + 4 + 0 + 1 = 13
    const digitsArray = Array.from(numberToConvert);
    let position = digitsArray.length - 1;
    let result = 0;
    for (const digit of digitsArray) {
      result += Math.pow(baseFrom, position) * this.getDigitAsNumber(digit);
      position--;
    }
    return result;
  }
  private getDigitAsNumber(digit: string) {
    let result = parseInt(digit);
    if (isNaN(result)) {
      result = lettersToNumbersMap[digit];
    }
    return result;
  }
  convertFromDecimalToBaseN(numberToConvert: number, baseTo: number): string {
    let numberToConvertCopy = numberToConvert;
    const remainders = [];
    while (true) {
      const quotient = Math.floor(numberToConvertCopy / baseTo);
      const remainder = numberToConvertCopy % baseTo;
      remainders.push(remainder >= 10 ? this.numbersToLettersMap[remainder] : remainder.toString());
      numberToConvertCopy = quotient;
      if (numberToConvertCopy < baseTo) {
        break;
      }
    }
    remainders.reverse();
    let result =
      numberToConvertCopy >= 10
        ? (this.numbersToLettersMap[numberToConvertCopy] as string)
        : numberToConvertCopy.toString();
    remainders.forEach((remainder) => {
      result += remainder;
    });
    return result;
  }
}
