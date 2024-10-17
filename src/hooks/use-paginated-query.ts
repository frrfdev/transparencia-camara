import { PaginatedRequest } from '@/types/PaginatedRequest';
import {
  useQuery,
  keepPreviousData,
  QueryKey,
  UseQueryOptions,
} from '@tanstack/react-query';
import { DispatchPagination, paginationToApi } from './use-pagination';
import { PaginationState } from './use-pagination';
import { api, ApiResponseConverter } from '@/lib/api';
import { PaginatedRequestApi } from '@/types/api/PaginatedRequestApi';

export type PaginatedQueryParams = Partial<PaginationState> & {
  dispatchPagination: DispatchPagination;
};

type Props<T> = {
  permissions?: string[] | string;
  params?: {
    [key: string]: unknown;
    params?: { [key: string]: unknown };
  } & PaginatedQueryParams;
  url: string;
} & UseQueryOptions<PaginatedRequest<T>, Error, PaginatedRequest<T>, QueryKey>;

export const usePaginatedQuery = <T>(props: Props<T>) => {
  return useQuery<PaginatedRequest<T>>({
    ...props,
    placeholderData: keepPreviousData,
    queryKey: [
      ...props.queryKey,
      `pagina=${props.params?.current}&itens=${props.params?.pageSize}&ordem=${props.params?.sort?.order}&ordenarPor=${props.params?.sort?.field}`,
      props.params?.sort,
      props.params?.filter,
    ],
    queryFn: async () => {
      const response = await api.get<PaginatedRequestApi<T>>(props.url, {
        params: {
          ...paginationToApi(props.params),
          ...(props.params || { params: {} })?.params,
        },
      });

      if (response.status !== 200) throw new Error('Error');

      const convertedResponse = ApiResponseConverter.paginatedRequest(
        response.data
      );

      props.params?.dispatchPagination({
        type: 'SET_TOTAL',
        payload: convertedResponse.total,
      });

      props.params?.dispatchPagination({
        type: 'SET_LAST_PAGE',
        payload: convertedResponse.lastPage,
      });

      return convertedResponse;
    },
  });
};
