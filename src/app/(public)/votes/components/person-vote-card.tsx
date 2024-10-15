import { cn } from '@/lib/utils';
import React from 'react';
import { Deputy, Vote } from '../../../../types/GetVotingSessionVotesResponse';
import { PartyLogo } from './party-logo';
import Image from 'next/image';
import { ColorUtils } from '../utils/colors';

type Props = {
  person: Deputy;
  vote: Vote;
};

export const PersonVoteCard = ({ person, vote }: Props) => {
  return (
    <div key={person.id} className={cn('flex items-center gap-2 relative w-fit')}>
      <span className="absolute top-0 left-0">
        <PartyLogo party={person.siglaPartido} />
      </span>
      <Image src={person.urlFoto} alt={person.nome} width={500 / 3} height={500 / 4} />
      <strong
        className={cn(
          'absolute w-full bottom-0 left-0 bg-black text-white p-1 text-center whitespace-nowrap overflow-ellipsis overflow-hidden'
        )}
        style={{
          backgroundColor: ColorUtils.voteTypeToColor(vote.tipoVoto),
        }}
      >
        {person.nome}
      </strong>
    </div>
  );
};
