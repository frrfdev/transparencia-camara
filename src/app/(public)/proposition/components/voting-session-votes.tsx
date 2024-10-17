import React from 'react';
import { useGetVotingSessionVotesQuery } from '../hooks/api/use-get-voting-session-votes.query';
import { DetailsGridContent } from '@/components/ui/details-grid';
import { VotingSessionChart } from '../../votes/components/voting-session-chart';
import { VotingSessionPartyChart } from '../../votes/components/voting-session-party-chart';
import { VotingSessionVotesSkeleton } from './voting-session-votes-skeleton';

type Props = {
  votingSessionId: string;
};

export const VotingSessionVotes = ({ votingSessionId }: Props) => {
  const {
    data: votes,
    isLoading,
    isPending,
  } = useGetVotingSessionVotesQuery({
    votingSessionId,
  });

  if (isLoading || isPending) return <VotingSessionVotesSkeleton />;

  return (
    <DetailsGridContent
      className="relative w-1/2 p-4 h-full overflow-y-auto rounded-md"
      tabIndex={0}
    >
      <VotingSessionChart votes={votes?.dados ?? []} />
      <VotingSessionPartyChart votes={votes?.dados ?? []} />
      {votes?.dados.map((vote) => (
        <div key={vote.deputado_.id}>
          {vote.deputado_.nome} ({vote.deputado_.siglaPartido}) -{' '}
          {vote.tipoVoto}
        </div>
      ))}
    </DetailsGridContent>
  );
};
