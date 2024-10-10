// https://dadosabertos.camara.leg.br/api/v2/referencias/tiposProposicao

import { api } from '@/lib/api';
import { ApiResponse } from '@/types/api/ApiResponse';
import { useQuery } from '@tanstack/react-query';
import { PropositionTypeApi } from '../../types/PropositionType';

export const useGetPropositionTypesQuery = () => {
  return useQuery({
    queryKey: ['propositionTypes'],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const response = await api.get<ApiResponse<PropositionTypeApi[]>>(
        '/referencias/tiposProposicao',
        {
          headers: {
            Accept: 'application/json',
          },
        }
      );
      return response.data.dados;
    },
  });
};
