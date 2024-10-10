'use client';

import Image from 'next/image';
import { useGetPersonDetailsQuery } from '../hooks/api/use-get-person-details.query';
import { MaleSvg } from '@/components/icons/male.svg';
import { FemaleSvg } from '@/components/icons/female.svg';
import { PartyIcon } from './party-icon';
import { PartyUtils } from '../../votes/utils/party';

type PersonCardProps = {
  personId: number;
} & React.HTMLAttributes<HTMLDivElement>;

export const PersonCard = ({ personId, ...props }: PersonCardProps) => {
  const { data: personDetails } = useGetPersonDetailsQuery({ personId });
  return (
    <div
      className="flex gap-2 bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] px-4 py-4 pr-8 rounded-full focus:bg-neutral-950 focus:text-white focus:outline-none"
      {...props}
    >
      <div className="h-[80px] rounded-full min-w-[80px] overflow-hidden	 w-[80px] relative">
        <Image
          src={
            process.env.NEXT_PUBLIC_ENV === 'localhost'
              ? '/assets/images/placeholder/person.jpg'
              : personDetails?.ultimoStatus.urlFoto ?? ''
          }
          alt={personDetails?.ultimoStatus.nome ?? ''}
          fill
          className="absolute w-full"
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col justify-between h-full">
          <strong className="whitespace-nowrap flex justify-between items-center gap-2">
            <span>{personDetails?.ultimoStatus.nome}</span>
            {personDetails?.sexo === 'M' ? (
              <MaleSvg fill="#60a5fa" height={16} width={16}></MaleSvg>
            ) : null}
            {personDetails?.sexo === 'F' ? (
              <FemaleSvg fill="#f87171" height={22} width={22}></FemaleSvg>
            ) : null}
          </strong>
          <strong className="flex items-center rounded-xl overflow-hidden bg-neutral-600">
            <div className="flex h-8">
              <div
                className="h-8 w-8 flex items-center justify-center p-1 rounded-tl-xl rounded-bl-xl"
                style={{
                  backgroundColor:
                    PartyUtils.partyToColor(
                      personDetails?.ultimoStatus.siglaPartido ?? ''
                    ) ?? '#737373',
                }}
              >
                <PartyIcon
                  className="h-7 w-7 fill-white "
                  party={personDetails?.ultimoStatus.siglaPartido ?? ''}
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
                  fill={
                    PartyUtils.partyToColor(
                      personDetails?.ultimoStatus.siglaPartido ?? ''
                    ) ?? '#737373'
                  }
                />
              </svg>
            </div>
            <span className="text-white font-bold h-full bg-neutral-600 pr-2 w-full text-center flex items-center justify-center">
              <span>
                {personDetails?.ultimoStatus.siglaPartido?.slice(0, 5) ?? '???'}
              </span>
            </span>
          </strong>
        </div>
      </div>
    </div>
  );
};
