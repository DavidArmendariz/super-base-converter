export const isInteger = (number: number): boolean => {
  return !(typeof number !== 'number' || number % 1);
};
