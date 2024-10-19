'use client';

import { useGetPersonDetailsQuery } from '../hooks/api/use-get-person-details.query';
import { PartyLabel } from './party-label';
import { GenderIcon } from './gender-icon';
import { PersonAvatar } from './person-avatar';
import { PersonCardSkeleton } from './person-card-skeleton';
import { HTMLMotionProps, motion } from 'framer-motion';
import { BrazilSvg } from '@/components/icons/brazil.svg';

type PersonCardProps = {
  personId: number;
  code: number;
  label: string;
} & HTMLMotionProps<'div'>;

export const PersonCard = ({
  personId,
  code,
  label,
  ...props
}: PersonCardProps) => {
  const {
    data: personDetails,
    isPending,
    isLoading,
    isError,
  } = useGetPersonDetailsQuery({
    personId: personId.toString(),
    shouldFetch: true,
  });

  if (isLoading || isPending) {
    return <PersonCardSkeleton />;
  }

  return (
    <motion.div
      {...props}
      className="flex gap-2 bg-white border-b-2 w-full border-neutral-200 px-4 py-4 pr-8 focus:bg-neutral-950 focus:text-white focus:outline-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {code === 30000 ? (
        <div>
          <BrazilSvg></BrazilSvg>
        </div>
      ) : (
        <PersonAvatar
          avatarUrl={personDetails?.ultimoStatus.urlFoto ?? ''}
          name={personDetails?.ultimoStatus.nome ?? 'Não encontrado'}
        />
      )}
      <div className="flex flex-col gap-2 w-full">
        <div className="flex flex-col justify-between h-full">
          <strong className="whitespace-nowrap flex justify-between items-center gap-2">
            <span>
              {personDetails?.ultimoStatus.nome ??
                (isError ? 'Solicitação bloqueada pelo governo 😔' : label)}
            </span>
            {code === 30000 ? null : (
              <GenderIcon gender={personDetails?.sexo ?? ''} />
            )}
          </strong>
          {code === 30000 ? null : (
            <PartyLabel
              party={personDetails?.ultimoStatus.siglaPartido ?? ''}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
};
