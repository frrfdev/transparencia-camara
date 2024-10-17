'use client';

import React from 'react';
import { PropositionTab } from './proposition-tab';
import { useGetPropositionDetailsQuery } from '../../patch-notes/hooks/api/use-get-proposition-details.query';
import { useParams } from 'next/navigation';
import {
  DetailsGridContent,
  DetailsGridHeader,
  DetailsGridRow,
} from '@/components/ui/details-grid';
import { DetailsGrid } from '@/components/ui/details-grid';
import { PropositionText } from './proposition-text';
import { TabPropositionGeneralDataSkeleton } from './tab-proposition-general-data-skeleton';

export const TabPropositionGeneralData = () => {
  const params = useParams();
  const {
    data: propositionDetails,
    isLoading,
    isPending,
  } = useGetPropositionDetailsQuery({
    propositionId: params.id as string,
  });

  if (isLoading || isPending) {
    return <TabPropositionGeneralDataSkeleton />;
  }

  return (
    <PropositionTab className="w-full flex gap-4 overflow-hidden h-full">
      <div className="w-1/2 flex flex-col gap-4 pt-4">
        <DetailsGrid>
          <DetailsGridRow
            label="TIPO"
            value={`${propositionDetails?.siglaTipo ?? ''} - ${
              propositionDetails?.descricaoTipo ?? ''
            }`}
          />
          <DetailsGridRow label="NÚMERO" value={propositionDetails?.numero} />
          <DetailsGridRow
            label="STATUS"
            value={propositionDetails?.statusProposicao.descricaoTramitacao}
          />
          <DetailsGridRow
            label="ORGÃO"
            value={propositionDetails?.statusProposicao.siglaOrgao}
          />
        </DetailsGrid>
        <div>
          <DetailsGridHeader>EMENTA</DetailsGridHeader>
          <DetailsGridContent className="p-4 w-full drop-shadow-md">
            {propositionDetails?.ementa}
          </DetailsGridContent>
        </div>
      </div>
      <div className="w-1/2  overflow-hidden h-full p-4">
        <PropositionText />
      </div>
    </PropositionTab>
  );
};
