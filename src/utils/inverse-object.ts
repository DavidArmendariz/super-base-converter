export const inverseObject = (object: Record<string, unknown>): Record<string, unknown> => {
  return Object.keys(object).reduce((reversedObject, key) => {
    const value = object[key] as string;
    reversedObject[value] = key;
    return reversedObject;
  }, {} as Record<string, unknown>);
};
