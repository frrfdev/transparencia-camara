import React, { useEffect } from 'react';
import { useGetVotingSessionVotesQuery } from '../../../../hooks/api/use-get-voting-session-votes.query';
import {
  DetailsGridContent,
  DetailsGridHeader,
} from '@/components/ui/details-grid';
import { VotingSessionVotesSkeleton } from './voting-session-votes-skeleton';
import { useGetVotingSessionDetailsQuery } from '../../../../hooks/api/use-get-voting-session-details.query';
import { VotingSessionVotesCharts } from './voting-session-votes-charts';
import { useVotingSessionStore } from '../stores/use-voting-session-store';
import { VotingSessionVotesPerson } from './voting-session-votes-person';
import { useMenuContext } from '@/app/providers/menu-provider';
import { redirect, useRouter } from 'next/navigation';
import { SymbolicVotation } from './symbolic-votation';

type Props = {
  votingSessionId: string;
};

export const VotingSessionVotes = ({ votingSessionId }: Props) => {
  const { addOption, removeOption } = useMenuContext();
  const router = useRouter();

  const {
    data: votes,
    isLoading,
    isPending,
  } = useGetVotingSessionVotesQuery({
    votingSessionId,
  });

  const {
    data: votingSessionDetails,
    isLoading: isLoadingVotingSessionDetails,
  } = useGetVotingSessionDetailsQuery({
    votingSessionId,
  });

  const selectedVisualization = useVotingSessionStore(
    (state) => state.selectedVisualization
  );

  useEffect(() => {
    addOption({
      key: 'd',
      label: 'Detalhes da Votação',
      icon: 'D',
      action: (e) => {
        router.push(`/votation/${votingSessionId}`);
      },
    });

    return () => {
      removeOption('d');
    };
  }, [votingSessionId]);

  if (isLoading || isPending || isLoadingVotingSessionDetails)
    return <VotingSessionVotesSkeleton />;

  return (
    <DetailsGridContent
      className="relative p-4 bg-transparent drop-shadow-soft w-1/2 h-full overflow-y-auto "
      tabIndex={0}
    >
      <DetailsGridHeader>
        {votingSessionDetails?.dados?.data
          ? Intl.DateTimeFormat('pt-BR').format(
              new Date(votingSessionDetails?.dados?.data ?? '')
            )
          : 'Data não informada'}
      </DetailsGridHeader>
      {!votes?.dados.length ? (
        <div className="flex flex-col gap-4 w-full h-full items-center justify-center p-6">
          <SymbolicVotation></SymbolicVotation>
        </div>
      ) : (
        <div className="mt-4">
          {(() => {
            switch (selectedVisualization) {
              case 'charts':
                return (
                  <VotingSessionVotesCharts votingSessionId={votingSessionId} />
                );
              case 'person':
                return <VotingSessionVotesPerson votes={votes?.dados ?? []} />;
            }
          })()}
        </div>
      )}
    </DetailsGridContent>
  );
};
