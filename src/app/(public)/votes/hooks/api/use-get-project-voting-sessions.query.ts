'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ProjectVotingSessionsResponse } from '../../types/GetProjectVotingSessionsResponse';

type UseGetProjectVotingSessionsQueryProps = {
  projectId: string;
};

export const useGetProjectVotingSessionsQuery = ({
  projectId,
}: UseGetProjectVotingSessionsQueryProps) => {
  return useQuery({
    queryKey: ['projectVotingSessions', projectId],
    queryFn: async () => {
      const response = await axios.get<ProjectVotingSessionsResponse>(
        `https://dadosabertos.camara.leg.br/api/v2/proposicoes/${projectId}/votacoes?ordem=DESC&ordenarPor=dataHoraRegistro`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data;
    },
    enabled: !!projectId,
  });
};
