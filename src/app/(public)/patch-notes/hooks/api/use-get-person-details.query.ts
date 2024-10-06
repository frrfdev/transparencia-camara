import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { PersonDetailsResponseApi } from '../../types/PersonDetailsResponse';

type PersonDetailsQueryProps = {
  personId: number;
};

export const useGetPersonDetailsQuery = ({ personId }: PersonDetailsQueryProps) => {
  return useQuery({
    queryKey: ['person-details', personId],
    staleTime: 1000 * 60 * 60 * 24,
    queryFn: async () => {
      const response = await api.get<PersonDetailsResponseApi>(`/deputados/${personId}`);
      return response.data.dados;
    },
  });
};
