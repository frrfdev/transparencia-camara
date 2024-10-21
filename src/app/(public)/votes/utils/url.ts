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
          if (!value.length) return null;
          return `${key}=${value.map((v) => v).join(',')}`;
        }
        if (!value) return null;
        return `${key}=${value}`;
      })
      .filter((v) => v)
      .join('&');
  },
};
