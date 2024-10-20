import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { PropositionDetailsResponseApi } from '../../types/PropositionDetailsResponse';

type GetPropositionDetailsParams = {
  propositionId: string;
};

export const useGetPropositionDetailsQuery = ({
  propositionId,
}: GetPropositionDetailsParams) => {
  return useQuery({
    queryKey: ['proposition-details', propositionId],
    staleTime: 1000 * 60 * 60 * 24, // 1 day
    queryFn: async () => {
      if (!propositionId) return null;
      const response = await api.get<PropositionDetailsResponseApi>(
        `/proposicoes/${propositionId}`
      );
      return response.data.dados;
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};
