export const UrlUtils = {
  buildQueryString: (
    values: Record<
      string,
      string | number | boolean | string[] | number[] | null
    >
  ) => {
    return Object.entries(values)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          return `${key}=${value.map((v) => v).join(',')}`;
        }
        return `${key}=${value}`;
      })
      .join('&');
  },
};
