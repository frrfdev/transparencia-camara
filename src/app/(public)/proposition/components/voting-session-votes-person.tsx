'use client';

import { cn } from '@/lib/utils';
import { Vote } from '@/types/GetVotingSessionVotesResponse';
import React from 'react';
import { PersonAvatar } from '../../patch-notes/components/person-avatar';
import { useParams } from 'next/navigation';
import { useGetVotingSessionVotesQuery } from '@/hooks/api/use-get-voting-session-votes.query';

export const VotingSessionVotesPersonParams = () => {
  const { id } = useParams();
  const { data } = useGetVotingSessionVotesQuery({
    votingSessionId: id as string,
  });
  return <VotingSessionVotesPerson votes={data?.dados ?? []} />;
};

type Props = {
  votes: Vote[];
};

export const VotingSessionVotesPerson = ({ votes }: Props) => {
  return (
    <div className="flex gap-4 flex-wrap">
      {votes?.map((vote) => (
        <div
          tabIndex={3}
          key={vote.deputado_.id}
          className={cn(
            'w-20 h-20 min-w-20 rounded-lg  overflow-hidden backdrop-blur-lg shadow-soft bg-opacity-20 flex justify-center items-center focus:bg-opacity-50 hover:bg-opacity-50',
            vote.tipoVoto === 'Sim' && 'bg-green-500',
            vote.tipoVoto === 'Não' && 'bg-red-500',
            vote.tipoVoto === 'Abstenção' && 'bg-yellow-500',
            vote.tipoVoto === 'Artigo 17' && 'bg-orange-500',
            vote.tipoVoto === 'Obstrução' && 'bg-gray-500'
          )}
        >
          <PersonAvatar
            avatarUrl={vote.deputado_.urlFoto}
            name={vote.deputado_.nome}
            className="w-16 h-16 min-w-16 rounded-lg"
          />
        </div>
      ))}
    </div>
  );
};
