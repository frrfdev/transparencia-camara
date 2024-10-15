'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { ProjectVotingSessionsResponse } from '@/types/GetProjectVotingSessionsResponse';

type UseGetProjectVotingSessionsQueryProps = {
  projectId: string;
};

export const useGetProjectVotingSessionsQuery = ({ projectId }: UseGetProjectVotingSessionsQueryProps) => {
  return useQuery({
    queryKey: ['projectVotingSessions', projectId],
    queryFn: async () => {
      const response = await api.get<ProjectVotingSessionsResponse>(
        `proposicoes/${projectId}/votacoes?ordem=DESC&ordenarPor=dataHoraRegistro`,
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
