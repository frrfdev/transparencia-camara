import { useQuery } from '@tanstack/react-query';
import { getPropositionResume } from '../../actions/get-proposition-resume';
import { PropositionResumeData } from '../../types/PropositionResumeData';
import { useMessageContext } from '@/app/providers/message-provider';

type UseGetPropositionResumeProps = {
  propositionId: string;
};

export const useGetPropositionResume = ({
  propositionId,
}: UseGetPropositionResumeProps) => {
  const { addMessage } = useMessageContext();
  console.log(propositionId);

  return useQuery<PropositionResumeData | null>({
    queryKey: ['propositionResume', propositionId],
    staleTime: 1000 * 60 * 5,
    queryFn: async () => {
      if (!propositionId) return null;
      const propositionResume = await getPropositionResume(propositionId);
      if (!propositionResume) {
        addMessage({
          content: 'Resumo não encontrado',
        });
        return null;
      }
      return propositionResume;
    },
  });
};
