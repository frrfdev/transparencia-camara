export const DataConverter = {
  toSelectOptions: <T, V extends keyof T, L extends keyof T>(data: T[], value: V, label: L) => {
    return data.map((item) => ({
      value: item[value],
      label: item[label],
      data: item,
    }));
  },
};
