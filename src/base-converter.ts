export class BaseConverter {
  convertFromBaseNToDecimal(numberToConvert: string, baseFrom: number): number {
    // 1101 (binary) -> 2^3 * 1 + 2^2 * 1 + 2^1 * 0 + 2^0 * 1 = 8 + 4 + 0 + 1 = 13
    const digitsArray = Array.from(numberToConvert);
    let position = digitsArray.length - 1;
    let result = 0;
    for (const digit of digitsArray) {
      result += Math.pow(baseFrom, position) * parseInt(digit);
      position--;
    }
    return result;
  }
}
