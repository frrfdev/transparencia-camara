import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { GetProjectResponse } from '../../types/GetProjectResponse';

export const useGetProjectQuery = (projectId: string) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () =>
      axios.get<GetProjectResponse>(
        `https://dadosabertos.camara.leg.br/api/v2/proposicoes/${projectId}`
      ),
  });
};
