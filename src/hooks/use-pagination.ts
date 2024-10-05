'use client';

import { Dispatch, useReducer } from 'react';

type Sort = { field: string; order: 'asc' | 'desc' };

export interface PaginationState {
  pageSize: number;
  current: number;
  total: number;
  lastPage: number;
  search?: string;
  sort?: Sort;
  filter?: unknown;
  firstPageIndex?: number;
}

export type DispatchPagination = Dispatch<PaginationAction>;

interface PaginationOverrideAction {
  type: 'OVERRIDE_PAGINATION';
  payload: PaginationState;
}

interface PaginationSetCurrentAction {
  type: 'SET_CURRENT';
  payload: number;
}

interface PaginationSetLastPageAction {
  type: 'SET_LAST_PAGE';
  payload: number;
}

interface PaginationSetTotalAction {
  type: 'SET_TOTAL';
  payload: number;
}

interface PaginationSetPerPageAction {
  type: 'SET_PER_PAGE';
  payload: number;
}

interface PaginationNextPageAction {
  type: 'NEXT_PAGE';
}

interface PaginationPreviousPageAction {
  type: 'PREVIOUS_PAGE';
}

interface PaginationSetSearchAction {
  type: 'SET_SEARCH';
  payload: string;
}

interface PaginationSetSortAction {
  type: 'SET_SORT';
  payload: Sort;
}

interface PaginationSetFilterAction {
  type: 'SET_FILTER';
  payload: unknown;
}

export type PaginationAction =
  | PaginationOverrideAction
  | PaginationSetCurrentAction
  | PaginationSetTotalAction
  | PaginationSetPerPageAction
  | PaginationPreviousPageAction
  | PaginationNextPageAction
  | PaginationSetLastPageAction
  | PaginationSetSortAction
  | PaginationSetFilterAction
  | PaginationSetSearchAction;

const paginationReducer = (
  state: PaginationState,
  action: PaginationAction
) => {
  switch (action.type) {
    case 'OVERRIDE_PAGINATION':
      return {
        ...state,
        ...action.payload,
      };
    case 'NEXT_PAGE':
      return {
        ...state,
        current: state.current + 1,
      };
    case 'PREVIOUS_PAGE':
      return {
        ...state,
        current: state.current - 1,
      };
    case 'SET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    case 'SET_TOTAL':
      return {
        ...state,
        total: action.payload,
      };
    case 'SET_PER_PAGE':
      return {
        ...state,
        pageSize: action.payload,
      };
    case 'SET_LAST_PAGE':
      return {
        ...state,
        lastPage: action.payload,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        search: action.payload,
        current: state.firstPageIndex || 1,
      };
    case 'SET_SORT':
      return {
        ...state,
        sort: action.payload,
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
        current: 1,
      };
    default:
      return state;
  }
};

interface Props {
  initialPagination?: {
    current?: number;
    total?: number;
    pageSize?: number;
    lastPage?: number;
    sort?: Sort;
    filter?: unknown;
    firstPageIndex?: number;
  };
}

const INITIAL_PAGINATION = {
  current: 1,
  total: 1,
  pageSize: 10,
  lastPage: 1,
  search: '',
  sort: {} as Sort,
  filter: {},
  firstPageIndex: 1,
};

export const usePagination = (props?: Props) => {
  const [paginationConfig, dispatchPagination] = useReducer(
    paginationReducer,
    props?.initialPagination
      ? {
          ...props?.initialPagination,
          lastPage: props?.initialPagination?.lastPage || 1,
          total: props?.initialPagination?.total || 1,
          pageSize: props?.initialPagination?.pageSize || 10,
          current: props?.initialPagination?.current || 1,
          firstPageIndex: !Number.isNaN(
            props?.initialPagination?.firstPageIndex
          )
            ? props?.initialPagination?.firstPageIndex
            : 1,
        }
      : INITIAL_PAGINATION
  );

  return {
    paginationConfig: {
      ...paginationConfig,
      lastPage: paginationConfig.lastPage || 1,
      pageSize: paginationConfig.pageSize || 10,
    },
    dispatchPagination,
  };
};

export const paginationToApi = (
  pagination: Partial<PaginationState> | undefined
) => ({
  pagina: pagination?.current || 1,
  itens: pagination?.pageSize || 10,
  ordenarPor: pagination?.sort ? pagination.sort.field : '',
  ordem: pagination?.sort ? pagination.sort.order : 'asc',
  ...(pagination?.filter as object),
});
