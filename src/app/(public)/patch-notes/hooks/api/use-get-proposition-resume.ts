import { useQuery } from '@tanstack/react-query';
import { getPropositionResume } from '../../actions/get-proposition-resume';
import { PropositionResumeData } from '../../types/PropositionResumeData';

type UseGetPropositionResumeProps = {
  propositionId: string;
};

export const useGetPropositionResume = ({
  propositionId,
}: UseGetPropositionResumeProps) => {
  console.log(propositionId, 'propositionId');
  return useQuery<PropositionResumeData | null>({
    queryKey: ['propositionResume', propositionId],
    queryFn: () => {
      console.log('aaa');
      return getPropositionResume(propositionId);
    },
    enabled: !!propositionId,
  });
};
