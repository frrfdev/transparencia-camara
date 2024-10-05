export type PaginatedRequestApi<T> = {
  dados: T[];
  links: {
    rel: string;
    href: string;
  }[];
};
