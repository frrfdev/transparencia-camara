'use client';

import Image from 'next/image';
import { useGetPersonDetailsQuery } from '../hooks/api/use-get-person-details.query';
import { MaleSvg } from '@/components/icons/male.svg';
import { FemaleSvg } from '@/components/icons/female.svg';
import { PartyIcon } from './party-icon';
import { PartyUtils } from '../../votes/utils/party';
import { PartyLabel } from './party-label';
import { GenderIcon } from './gender-icon';
import { PersonAvatar } from './person-avatar';

type PersonCardProps = {
  personId: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const PersonCard = ({ personId, ...props }: PersonCardProps) => {
  const { data: personDetails } = useGetPersonDetailsQuery({ personId });
  return (
    <div
      className="flex gap-2 bg-white border-b-2 w-full border-neutral-200 px-4 py-4 pr-8 focus:bg-neutral-950 focus:text-white focus:outline-none"
      {...props}
    >
      <PersonAvatar
        avatarUrl={personDetails?.ultimoStatus.urlFoto ?? ''}
        name={personDetails?.ultimoStatus.nome ?? ''}
      ></PersonAvatar>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col justify-between h-full">
          <strong className="whitespace-nowrap flex justify-between items-center gap-2">
            <span>{personDetails?.ultimoStatus.nome}</span>
            <GenderIcon gender={personDetails?.sexo ?? ''} />
          </strong>
          <PartyLabel party={personDetails?.ultimoStatus.siglaPartido ?? ''} />
        </div>
      </div>
    </div>
  );
};
