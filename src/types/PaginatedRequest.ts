export type PaginatedRequest<T> = {
  data: T[];
  page: number;
  pageSize: number;
  search: string;
  total: number;
  lastPage: number;
};
