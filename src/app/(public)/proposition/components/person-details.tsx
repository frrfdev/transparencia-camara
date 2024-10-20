'use client';

import React from 'react';
import { useGetPersonDetailsQuery } from '../../patch-notes/hooks/api/use-get-person-details.query';
import {
  DetailsGrid,
  DetailsGridHeader,
  DetailsGridRow,
} from '@/components/ui/details-grid';
import { PersonAvatar } from '../../patch-notes/components/person-avatar';
import { PartyLabel } from '../../patch-notes/components/party-label';
import { StringUtils } from '@/lib/string';
import { PersonDetailsSkeleton } from './person-details-skeleton';
import { AnimatePresence, motion } from 'framer-motion';
import { PersonDetailsApi } from '../../patch-notes/types/PersonDetails';

type Props = {
  personId: string;
  renderContent?: (personDetails: PersonDetailsApi | null) => React.ReactNode;
};

const variants = {
  open: { opacity: 1 },
  closed: { opacity: 0 },
};

export const PersonDetails = ({ personId, renderContent }: Props) => {
  const {
    data: personDetails,
    isPending: isPending,
    isFetched,
  } = useGetPersonDetailsQuery({
    personId,
    shouldFetch: !!personId,
  });

  return (
    <div className=" w-full h-full  flex flex-col gap-4 items-center">
      <AnimatePresence mode="wait">
        {isPending ? (
          <motion.div
            className="w-full h-full"
            variants={variants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <PersonDetailsSkeleton />
          </motion.div>
        ) : null}
        {!isPending && isFetched ? (
          <motion.div
            key={personId}
            variants={variants}
            className="w-full flex flex-col overflow-y-auto bg-white shadow-soft h-max justify-start items-center"
            initial="closed"
            animate="open"
            exit="closed"
          >
            <DetailsGridHeader>
              {personDetails?.ultimoStatus?.nomeEleitoral}
            </DetailsGridHeader>
            <PersonAvatar
              className="rounded-full h-[120px] w-[120px] min-h-[120px] min-w-[120px] my-4"
              avatarUrl={personDetails?.ultimoStatus?.urlFoto ?? ''}
              name={personDetails?.nomeCivil ?? ''}
            />
            <DetailsGrid>
              <DetailsGridRow
                label="Nome Civil"
                value={personDetails?.nomeCivil}
              ></DetailsGridRow>
              <DetailsGridRow
                label="Condição Eleitoral"
                value={personDetails?.ultimoStatus?.condicaoEleitoral}
              />
              <DetailsGridRow
                label="Partido"
                value={
                  <PartyLabel
                    party={personDetails?.ultimoStatus.siglaPartido ?? ''}
                  />
                }
              />
              <DetailsGridRow
                label="Estado"
                value={personDetails?.ultimoStatus?.siglaUf}
              />
              <DetailsGridRow
                label="Situação"
                value={personDetails?.ultimoStatus?.situacao}
              />
              <DetailsGridRow
                label="CPF"
                value={StringUtils.formatCpf(personDetails?.cpf ?? '-')}
              />
            </DetailsGrid>
            {renderContent?.(personDetails ?? null)}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
