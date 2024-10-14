import { useQuery } from '@tanstack/react-query';
import { getPropositionResume } from '../../actions/get-proposition-resume';

export const useGetPropositionResume = (propositionId: string) => {
  return useQuery({
    queryKey: ['propositionResume', propositionId],
    queryFn: () => getPropositionResume(propositionId),
  });
};
