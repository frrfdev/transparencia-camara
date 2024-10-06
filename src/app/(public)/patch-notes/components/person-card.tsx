'use client';

import Image from 'next/image';
import { useGetPersonDetailsQuery } from '../hooks/api/use-get-person-details.query';

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
      <div className="h-[80px] rounded-full min-w-[80px] overflow-hidden  	 w-[80px] relative">
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
        <div className="flex justify-between items-center">
          <strong>{personDetails?.ultimoStatus.nome}</strong>
          <strong>{personDetails?.ultimoStatus.siglaPartido}</strong>
        </div>
      </div>
    </div>
  );
};
