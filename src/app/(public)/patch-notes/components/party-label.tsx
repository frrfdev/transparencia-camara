import React from 'react';
import { PartyUtils } from '../../votes/utils/party';
import { PartyIcon } from './party-icon';

type Props = {
  party: string;
};

export const PartyLabel = ({ party }: Props) => {
  return (
    <strong className="flex items-center rounded-xl overflow-hidden bg-neutral-600 w-max min-w-[100px]">
      <div className="flex h-8">
        <div
          className="h-8 w-8 flex items-center justify-center p-1 rounded-tl-xl rounded-bl-xl"
          style={{
            backgroundColor: PartyUtils.partyToColor(party ?? '') ?? '#737373',
          }}
        >
          <PartyIcon
            className="h-7 w-7 fill-white "
            party={party ?? ''}
          ></PartyIcon>
        </div>

        <svg
          className="inset-0 h-full bg-neutral-600"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3 10"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 3,0 0,10"
            fill={PartyUtils.partyToColor(party ?? '') ?? '#737373'}
          />
        </svg>
      </div>
      <span className="text-white font-bold h-full bg-neutral-600 pr-2 w-full text-center flex items-center justify-center">
        <span>{party?.slice(0, 5) ?? '???'}</span>
      </span>
    </strong>
  );
};
