'use client';

import {
  DetailsGridContent,
  DetailsGridHeader,
} from '@/components/ui/details-grid';
import React from 'react';
import { VotingSessionChart } from '../../votes/components/voting-session-chart';
import { VotingSessionPartyChart } from '../../votes/components/voting-session-party-chart';
import { useParams } from 'next/navigation';
import { useGetVotingSessionVotesQuery } from '@/hooks/api/use-get-voting-session-votes.query';

export const VotingSessionVotesChartsParams = () => {
  const { id } = useParams();

  return <VotingSessionVotesCharts votingSessionId={id as string} />;
};

type VotingSessionVotesChartsProps = {
  votingSessionId: string;
};

export const VotingSessionVotesCharts = ({
  votingSessionId,
}: VotingSessionVotesChartsProps) => {
  const { data: votingSessionVotes, isLoading: isLoadingVotingSessionVotes } =
    useGetVotingSessionVotesQuery({
      votingSessionId,
    });

  if (!votingSessionVotes?.dados?.length) return null;

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full">
        <DetailsGridHeader>Votação</DetailsGridHeader>
        <DetailsGridContent className=" flex items-center">
          <VotingSessionChart
            votes={votingSessionVotes?.dados ?? []}
            type="donut"
          />
        </DetailsGridContent>
      </div>
      <div className="w-full">
        <DetailsGridHeader>Votação por Partido</DetailsGridHeader>
        <DetailsGridContent>
          <VotingSessionPartyChart
            type="radar"
            votes={votingSessionVotes?.dados ?? []}
          />
        </DetailsGridContent>
      </div>
    </div>
  );
};
