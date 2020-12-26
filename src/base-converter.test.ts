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
});
