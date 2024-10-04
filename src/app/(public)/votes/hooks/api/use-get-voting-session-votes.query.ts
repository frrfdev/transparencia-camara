'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { VotingSessionVotesResponse } from '../../types/GetVotingSessionVotesResponse';

type UseGetVotingSessionVotesQueryProps = {
  votingSessionId: string;
};

export const useGetVotingSessionVotesQuery = ({
  votingSessionId,
}: UseGetVotingSessionVotesQueryProps) => {
  return useQuery({
    queryKey: ['votingSessionVotes', votingSessionId],
    queryFn: async () => {
      const response = await axios.get<VotingSessionVotesResponse>(
        `https://dadosabertos.camara.leg.br/api/v2/votacoes/${votingSessionId}/votos`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data;
    },
    enabled: !!votingSessionId,
  });
};
