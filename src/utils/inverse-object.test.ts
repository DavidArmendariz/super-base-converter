import { inverseObject } from './inverse-object';

describe('When given an object', () => {
  test('should reverse the keys with the values', () => {
    expect(inverseObject({ A: 10, B: 11, C: 12 })).toEqual({ 10: 'A', 11: 'B', 12: 'C' });
  });
});
