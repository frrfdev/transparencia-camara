import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { GetProjectResponse } from '@/types/GetProjectResponse';

export const useGetProjectQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => api.get<GetProjectResponse>(`https://dadosabertos.camara.leg.br/api/v2/proposicoes/${projectId}`),
  });
};
