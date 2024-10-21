'use client';

import { cn } from '@/lib/utils';
import { Vote } from '@/types/GetVotingSessionVotesResponse';
import React from 'react';
import { PersonAvatar } from '../../patch-notes/components/person-avatar';
import { useParams } from 'next/navigation';
import { useGetVotingSessionVotesQuery } from '@/hooks/api/use-get-voting-session-votes.query';
import { BookText, Check, CircleOff, TrafficCone, X } from 'lucide-react';
import { useVotingSessionStore } from '../stores/use-voting-session-store';
import { ColorUtils } from '../../votes/utils/colors';
import { SymbolicVotation } from './symbolic-votation';
import { SoundFocus } from '@/components/ui/sound-focus';

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
  const { setSelectedPersonId, setSelectedPersonVote } =
    useVotingSessionStore();

  if (!votes.length)
    return (
      <div className="h-full w-full bg-white shadow-soft flex justify-center items-center flex-col p-6 rounded-lg">
        <SymbolicVotation></SymbolicVotation>
      </div>
    );

  return (
    <div className="flex gap-4 flex-wrap px-4">
      {votes?.map((vote) => (
        <SoundFocus key={vote.deputado_.id}>
          <div
            tabIndex={2}
            className={cn(
              'w-20 relative cursor-pointer h-20 min-w-20 rounded-lg  backdrop-blur-lg shadow-soft bg-opacity-20 flex justify-center items-center focus:bg-opacity-50 hover:bg-opacity-50',
              'bg-gray-500'
            )}
            onClick={() => {
              setSelectedPersonId(vote.deputado_.id.toString());
              setSelectedPersonVote(vote.tipoVoto);
            }}
            onFocus={() => {
              setSelectedPersonId(vote.deputado_.id.toString());
              setSelectedPersonVote(vote.tipoVoto);
            }}
          >
            <PersonAvatar
              avatarUrl={vote.deputado_.urlFoto}
              name={vote.deputado_.nome}
              className="w-16 h-16 min-w-16 rounded-lg"
            />
            <div
              className={cn(
                'absolute -bottom-1 -right-1 rounded-full p-1 text-white'
              )}
              style={{
                background: ColorUtils.voteTypeToColor(vote.tipoVoto),
              }}
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
        </SoundFocus>
      ))}
    </div>
  );
};
