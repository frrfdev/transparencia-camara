import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';
import { PersonDetailsResponseApi } from '../../types/PersonDetailsResponse';

type PersonDetailsQueryProps = {
  personId: string;
  shouldFetch: boolean;
};

export const useGetPersonDetailsQuery = ({
  personId,
  shouldFetch,
}: PersonDetailsQueryProps) => {
  return useQuery({
    queryKey: ['person-details', personId],
    staleTime: 1000 * 60 * 60 * 24,
    enabled: shouldFetch,
    queryFn: async () => {
      const response = await api.get<PersonDetailsResponseApi>(
        `/deputados/${personId}`
      );
      return response.data.dados;
    },
  });
};
