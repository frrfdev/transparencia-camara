import React from 'react';
import { useGetVotingSessionVotesQuery } from '../hooks/api/use-get-voting-session-votes.query';
import {
  DetailsGridContent,
  DetailsGridHeader,
} from '@/components/ui/details-grid';
import { VotingSessionChart } from '../../votes/components/voting-session-chart';
import { VotingSessionPartyChart } from '../../votes/components/voting-session-party-chart';
import { VotingSessionVotesSkeleton } from './voting-session-votes-skeleton';
import { useGetVotingSessionDetailsQuery } from '../hooks/api/use-get-voting-session-details.query';

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

  const {
    data: votingSessionDetails,
    isLoading: isLoadingVotingSessionDetails,
  } = useGetVotingSessionDetailsQuery({
    votingSessionId,
  });

  if (isLoading || isPending || isLoadingVotingSessionDetails)
    return <VotingSessionVotesSkeleton />;

  return (
    <DetailsGridContent
      className="relative bg-transparent drop-shadow-soft w-1/2 h-full overflow-y-auto "
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
          <h1 className="text-4xl font-black text-neutral-600 uppercase">
            Votação Simbólica
          </h1>
          <p className="text-center">
            A votação simbólica é uma votação onde os votos não são registrados
            assim fazendo com que haja menos transparência e menos controle
            sobre o processo. Deixando a população sem acesso a informações
            sobre o voto de seus representantes.
          </p>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex gap-4">
            <div className="w-1/2">
              <DetailsGridHeader>Votação</DetailsGridHeader>
              <DetailsGridContent className=" flex items-center">
                <VotingSessionChart votes={votes?.dados ?? []} type="donut" />
              </DetailsGridContent>
            </div>
            <div className="w-1/2">
              <DetailsGridHeader>Votação por Partido</DetailsGridHeader>
              <DetailsGridContent>
                <VotingSessionPartyChart
                  type="radar"
                  votes={votes?.dados ?? []}
                />
              </DetailsGridContent>
            </div>
          </div>
          {votes?.dados.map((vote) => (
            <div key={vote.deputado_.id}>
              {vote.deputado_.nome} ({vote.deputado_.siglaPartido}) -{' '}
              {vote.tipoVoto}
            </div>
          ))}
        </div>
      )}
    </DetailsGridContent>
  );
};
