'use client';

import React from 'react';
import { useGetPropositionVotingSessionsQuery } from '../../../../hooks/api/use-get-proposition-voting-sessions.query';
import { useParams } from 'next/navigation';
import { PropositionTab } from './proposition-tab';
import { PokemonButton } from '@/components/ui/pokemon-button';
import { CircleCheck, CircleX } from 'lucide-react';
import { useVotingSessionStore } from '../stores/use-voting-session-store';
import { VotingSessionVotes } from './voting-session-votes';
import { TabPropositionVotingSessionsSkeleton } from './tab-proposition-voting-sessions-skeleton';
import { markForFocusLater, popWithoutFocus } from '@/lib/focusManager';

export const TabPropositionVotingSessions = () => {
  const params = useParams();
  const { id } = params;
  const { selectedVotingSession, setSelectedVotingSession } =
    useVotingSessionStore();

  const {
    data: votingSessions,
    isLoading,
    isPending,
  } = useGetPropositionVotingSessionsQuery({
    projectId: id as string,
  });

  if (isLoading || isPending) return <TabPropositionVotingSessionsSkeleton />;

  if (!votingSessions?.dados.length)
    return (
      <PropositionTab className="p-4 flex gap-4 overflow-hidden h-full">
        <div className="h-full w-full flex justify-center items-center font-bold uppercase text-gray-800 opacity-50 text-4xl md:text-[10rem] text-center p-6 leading-[100%]">
          Nenhuma votação
        </div>
      </PropositionTab>
    );

  return (
    <PropositionTab className="p-4 flex gap-4 overflow-hidden h-full">
      <div className="w-1/2 h-full flex flex-col gap-2 p-4 overflow-auto shrink-1">
        {votingSessions.dados.map((votingSession) => (
          <PokemonButton
            onFocus={(e) => {
              popWithoutFocus();
              setSelectedVotingSession(votingSession.id);
              markForFocusLater(e.currentTarget);
            }}
            isSelected={selectedVotingSession === votingSession.id}
            key={votingSession.id}
            color={votingSession.aprovacao === 1 ? '#22C55E' : '#F43F5E'}
            skeletonColor="#f0f0f0"
            detailRender={(() => {
              if (isLoading) return <></>;
              if (votingSession.aprovacao === 1)
                return (
                  <span className="text-green-300">
                    <CircleCheck size={40}></CircleCheck>
                  </span>
                );
              return (
                <span className="text-red-300">
                  <CircleX size={40}></CircleX>
                </span>
              );
            })()}
            className="min-h-[50px]"
          >
            <span className="line-clamp-2 w-full text-center">
              {votingSession.descricao}
            </span>
          </PokemonButton>
        ))}
      </div>
      {selectedVotingSession && (
        <VotingSessionVotes votingSessionId={selectedVotingSession} />
      )}
    </PropositionTab>
  );
};
