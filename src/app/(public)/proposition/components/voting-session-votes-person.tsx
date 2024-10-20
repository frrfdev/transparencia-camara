'use client';

import { cn } from '@/lib/utils';
import { Vote } from '@/types/GetVotingSessionVotesResponse';
import React from 'react';
import { PersonAvatar } from '../../patch-notes/components/person-avatar';
import { useParams } from 'next/navigation';
import { useGetVotingSessionVotesQuery } from '@/hooks/api/use-get-voting-session-votes.query';
import { BookText, Check, CircleOff, TrafficCone, X } from 'lucide-react';
import { useVotingSessionStore } from '../stores/use-voting-session-store';

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
  const { setSelectedPersonId } = useVotingSessionStore();

  return (
    <div className="flex gap-4 flex-wrap">
      {votes?.map((vote) => (
        <div
          tabIndex={2}
          key={vote.deputado_.id}
          className={cn(
            'w-20 relative cursor-pointer h-20 min-w-20 rounded-lg  backdrop-blur-lg shadow-soft bg-opacity-20 flex justify-center items-center focus:bg-opacity-50 hover:bg-opacity-50',
            'bg-gray-500'
          )}
          onClick={() => {
            setSelectedPersonId(vote.deputado_.id.toString());
          }}
          onFocus={() => {
            setSelectedPersonId(vote.deputado_.id.toString());
          }}
        >
          <PersonAvatar
            avatarUrl={vote.deputado_.urlFoto}
            name={vote.deputado_.nome}
            className="w-16 h-16 min-w-16 rounded-lg"
          />
          <div
            className={cn(
              'absolute -bottom-1 -right-1 rounded-full p-1 text-white',
              vote.tipoVoto === 'Sim' && 'bg-green-500',
              vote.tipoVoto === 'Não' && 'bg-red-500',
              vote.tipoVoto === 'Abstenção' && 'bg-yellow-500',
              vote.tipoVoto === 'Artigo 17' && 'bg-orange-500',
              vote.tipoVoto === 'Obstrução' && 'bg-gray-500'
            )}
          >
            {(() => {
              switch (vote.tipoVoto) {
                case 'Sim':
                  return <Check size={18} strokeWidth={2} />;
                case 'Não':
                  return <X size={18} strokeWidth={2} />;
                case 'Abstenção':
                  return <CircleOff size={18} strokeWidth={2} />;
                case 'Artigo 17':
                  return <BookText size={18} strokeWidth={2} />;
                case 'Obstrução':
                  return <TrafficCone size={18} strokeWidth={2} />;
              }
            })()}
          </div>
        </div>
      ))}
    </div>
  );
};
