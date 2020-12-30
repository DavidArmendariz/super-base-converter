import { lettersToNumbersMap } from './constants/letters-to-numbers-map';
import { inverseObject } from './utils/inverse-object';

export class BaseConverter {
  private numbersToLettersMap;
  private delimiter = '.';
  constructor() {
    this.numbersToLettersMap = inverseObject(lettersToNumbersMap);
  }
  private validateNumberInBaseN(numberToConvert: string, baseFrom: number): void {
    if (typeof numberToConvert !== 'string') {
      throw new Error('Number to convert must be a string');
    }
    if (typeof baseFrom !== 'number') {
      throw new Error('Base from needs to be a number');
    }
    const splittedNumberByDelimiter = numberToConvert.split(this.delimiter);
    if (splittedNumberByDelimiter.length < 1 || splittedNumberByDelimiter.length > 2) {
      throw new Error('Number contains more than one delimiter');
    }
    const digits = Array.from(numberToConvert).filter((digit) => digit !== this.delimiter);
    for (const digit of digits) {
      const digitAsNumber = this.getDigitAsNumber(digit);
      if (typeof digitAsNumber === 'undefined' || digitAsNumber >= baseFrom) {
        throw new Error('Invalid number');
      }
    }
  }
  convertFromBaseNToDecimal(numberToConvert: string, baseFrom: number): number {
    // 1101.11 (binary) -> 2^3 * 1 + 2^2 * 1 + 2^1 * 0 + 2^0 * 1 + 2^(-1) * 1 + 2^(-2) * 1
    // = 8 + 4 + 0 + 1 + 1/2 + 1/4 = 13.75
    this.validateNumberInBaseN(numberToConvert, baseFrom);
    const digitsArray = Array.from(numberToConvert).filter((digit) => digit !== this.delimiter);
    let position = numberToConvert.split(this.delimiter)[0].length - 1;
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
    while (result[0] === '0' && result.length !== 1) {
      result = result.slice(1);
    }
    return result;
  }
}
