'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { GetVotingSessionDetailsResponse } from '@/types/GetVotingSessionDetailsResponse';

type UseGetVotingSessionDetailsQueryProps = {
  votingSessionId: string;
};

export const useGetVotingSessionDetailsQuery = ({
  votingSessionId,
}: UseGetVotingSessionDetailsQueryProps) => {
  return useQuery({
    queryKey: ['votingSessionDetails', votingSessionId],
    queryFn: async () => {
      const response = await api.get<GetVotingSessionDetailsResponse>(
        `https://dadosabertos.camara.leg.br/api/v2/votacoes/${votingSessionId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data ?? null;
    },
    enabled: !!votingSessionId,
  });
};
