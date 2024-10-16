import { useQuery } from '@tanstack/react-query';
import { getPropositionResume } from '../../actions/get-proposition-resume';
import { PropositionResumeData } from '../../types/PropositionResumeData';

type UseGetPropositionResumeProps = {
  propositionId: string;
};

export const useGetPropositionResume = ({
  propositionId,
}: UseGetPropositionResumeProps) => {
  return useQuery<PropositionResumeData | null>({
    queryKey: ['propositionResume', propositionId],
    queryFn: () => getPropositionResume(propositionId),
    enabled: !!propositionId,
  });
};
