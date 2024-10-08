export const ArrayUtils = {
  removeNullAndUndefined: <T>(arr: T[]) => {
    return arr.filter((item) => item !== null && item !== undefined);
  },
  findOptionInArray: <T extends { value: string }>(
    option: string,
    array: T[]
  ) => {
    return array.find((item) => item.value === option);
  },
};
