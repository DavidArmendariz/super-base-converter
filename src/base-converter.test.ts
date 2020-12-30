import { BaseConverter } from './base-converter';

let converter: BaseConverter;
beforeAll(() => {
  converter = new BaseConverter();
});

describe('convertFromBaseNToDecimal()', () => {
  describe('When given a number in a base that is less than or equal to 10', () => {
    test('should convert it to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1101', 2)).toEqual(13);
      expect(converter.convertFromBaseNToDecimal('11011', 2)).toEqual(27);
      expect(converter.convertFromBaseNToDecimal('1210', 3)).toEqual(48);
    });
  });

  describe('When given a number in a base that is greater than 10', () => {
    test('should convert it to decimal', () => {
      expect(converter.convertFromBaseNToDecimal('1A1', 11)).toEqual(232);
      expect(converter.convertFromBaseNToDecimal('1B1', 14)).toEqual(351);
      expect(converter.convertFromBaseNToDecimal('ABC', 16)).toEqual(2748);
    });
  });

  describe('When given a number in base N with an integer and decimal part', () => {
    test('should convert it to a decimal number', () => {
      expect(converter.convertFromBaseNToDecimal('1101.10', 2)).toBeCloseTo(13.5);
      expect(converter.convertFromBaseNToDecimal('1234.12', 8)).toBeCloseTo(668.15625);
    });
  });

  describe('When given an invalid number in base N', () => {
    test('should throw an error indicating that the number is not a string', () => {
      expect(() => converter.convertFromBaseNToDecimal((1010 as unknown) as string, 2)).toThrowError(
        'Number to convert must be a string',
      );
    });
    test('should throw an error indicating that there is more than one delimiter', () => {
      expect(() => converter.convertFromBaseNToDecimal('1101.10.11', 2)).toThrowError(
        'Number contains more than one delimiter',
      );
    });
    test('should throw an error indicating that the number is invalid', () => {
      expect(() => converter.convertFromBaseNToDecimal('123', 3)).toThrowError('Invalid number');
      expect(() => converter.convertFromBaseNToDecimal('12@', 3)).toThrowError('Invalid number');
    });
    test('should throw an error indicating that the baseFrom must be a number', () => {
      expect(() => converter.convertFromBaseNToDecimal('123', ('5' as unknown) as number)).toThrowError(
        'Base from needs to be a number',
      );
    });
  });
});

describe('convertFromDecimalToBaseN()', () => {
  describe('When given a decimal number', () => {
    test('should convert it to a base N number', () => {
      expect(converter.convertFromDecimalToBaseN(13, 2)).toEqual('1101');
      expect(converter.convertFromDecimalToBaseN(27, 2)).toEqual('11011');
      expect(converter.convertFromDecimalToBaseN(48, 3)).toEqual('1210');
      expect(converter.convertFromDecimalToBaseN(232, 11)).toEqual('1A1');
      expect(converter.convertFromDecimalToBaseN(351, 14)).toEqual('1B1');
      expect(converter.convertFromDecimalToBaseN(2748, 16)).toEqual('ABC');
    });
  });
  describe('When given a decimal number that is less than the base we want to convert', () => {
    test('should convert it to a base N number and delete the zeroes from the left', () => {
      expect(converter.convertFromDecimalToBaseN(10, 16)).toEqual('A');
    });
  });
});
