import { useQuery } from '@tanstack/react-query';
import { getPropositionResume } from '../../actions/get-proposition-resume';
import { PropositionResumeData } from '../../types/PropositionResumeData';

export const useGetPropositionResume = (propositionId: string) => {
  return useQuery<PropositionResumeData | null>({
    queryKey: ['propositionResume', propositionId],
    queryFn: () => getPropositionResume(propositionId),
  });
};
