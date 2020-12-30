import { isInteger } from './is-integer';

describe('When given something that is not an integer number', () => {
  test('should return false', () => {
    expect(isInteger(('test' as unknown) as number)).toEqual(false);
    expect(isInteger(12.45)).toEqual(false);
  });
});

describe('When given an integer number', () => {
  test('should return true', () => {
    expect(isInteger(12)).toEqual(true);
  });
});
