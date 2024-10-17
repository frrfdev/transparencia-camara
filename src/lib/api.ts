import { PaginatedRequestApi } from '@/types/api/PaginatedRequestApi';
import { PaginatedRequest } from '@/types/PaginatedRequest';
import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

const extractPageFromLink = (link: string) => {
  if (!link) return 1;
  const page = link.split('pagina=')[1].split('&')[0];
  return parseInt(page);
};

const extractPageSizeFromLink = (link: string) => {
  const pageSize = link.split('itens=')[1].split('&')[0];
  return parseInt(pageSize);
};

export const ApiResponseConverter = {
  paginatedRequest: <T>(
    response: PaginatedRequestApi<T>
  ): PaginatedRequest<T> => {
    return {
      data: response.dados,
      page: extractPageFromLink(response.links[0]?.href),
      pageSize: extractPageSizeFromLink(response.links[0]?.href),
      lastPage: extractPageFromLink(response.links[3]?.href),
      total: 0,
      search: '',
    };
  },
};
