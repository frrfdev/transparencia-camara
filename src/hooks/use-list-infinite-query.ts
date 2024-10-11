import {
  DefinedInitialDataInfiniteOptions,
  useInfiniteQuery,
} from '@tanstack/react-query';
import { DispatchPagination, PaginationState } from './use-pagination';
import { PaginatedRequestApi } from '@/types/api/PaginatedRequestApi';
import { PaginatedRequest } from '@/types/PaginatedRequest';
import { api, ApiResponseConverter } from '@/lib/api';

export type ListInfiniteQueryParams = Partial<PaginationState> & {
  [key: string]: unknown;
};

export const useListInfiniteQuery = <T>(
  url: string,
  {
    queryKey,
    dispatchPagination,
    ...queryOptions
  }: Omit<
    DefinedInitialDataInfiniteOptions<PaginatedRequest<T>>,
    'getNextPageParam' | 'initialPageParam' | 'initialData' | 'queryFn'
  > & {
    permissions?: string[] | string;
    dispatchPagination: DispatchPagination;
  },
  params?: ListInfiniteQueryParams
) => {
  return useInfiniteQuery<PaginatedRequest<T>>({
    ...queryOptions,
    queryKey: [...queryKey],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      delete params?.pageSize;
      delete params?.current;
      delete params?.total;
      delete params?.lastPage;

      const response = await api.get<PaginatedRequestApi<T>>(url, {
        params: {
          ...(params || {}),
          pagina: (pageParam as number).toString(),
          itens: params?.pageSize || 10,
          ...params?.filter,
        },
      });

      const parsedResponseData = ApiResponseConverter.paginatedRequest(
        response.data
      );

      dispatchPagination({
        type: 'SET_LAST_PAGE',
        payload: parsedResponseData.lastPage,
      });

      return {
        ...parsedResponseData,
      };
    },
    getNextPageParam: ({ lastPage, page }) => {
      return page < lastPage ? page + 1 : undefined;
    },
    getPreviousPageParam: ({ page }) => (page > 0 ? page - 1 : undefined),
  });
};
