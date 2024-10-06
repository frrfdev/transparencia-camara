import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { PropositionAuthorsResponseApi } from '../../types/PropositionAuthorsResponse';

type PropositionAuthorsQueryProps = {
  propositionId: number;
};

export const useGetPropositionAuthorsQuery = ({ propositionId }: PropositionAuthorsQueryProps) => {
  return useQuery({
    queryKey: ['proposition-authors', propositionId],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const response = await api.get<PropositionAuthorsResponseApi>(`/proposicoes/${propositionId}/autores`);
      return response.data.dados;
    },
  });
};
