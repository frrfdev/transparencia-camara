import { useQuery } from '@tanstack/react-query';
import { GetProjectResponse } from '../../types/GetProjectResponse';
import { api } from '@/lib/api';

export const useGetProjectQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () =>
      api.get<GetProjectResponse>(
        `https://dadosabertos.camara.leg.br/api/v2/proposicoes/${projectId}`
      ),
  });
};
