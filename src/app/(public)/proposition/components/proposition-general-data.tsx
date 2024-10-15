'use client';

import React from 'react';
import { PropositionTab } from './proposition-tab';
import { useGetPropositionDetailsQuery } from '../../patch-notes/hooks/api/use-get-proposition-details.query';
import { useParams } from 'next/navigation';
import { DetailsGridRow } from '@/components/ui/details-grid';
import { DetailsGrid } from '@/components/ui/details-grid';

export const PropositionGeneralData = () => {
  const params = useParams();
  const { data: propositionDetails, isLoading } = useGetPropositionDetailsQuery({
    propositionId: Number(params.id),
  });

  return (
    <PropositionTab className="w-full">
      <DetailsGrid>
        <DetailsGridRow
          label="TIPO"
          value={`${propositionDetails?.siglaTipo ?? ''} - ${propositionDetails?.descricaoTipo ?? ''}`}
        />
        <DetailsGridRow label="NÚMERO" value={propositionDetails?.numero} />
        <DetailsGridRow label="STATUS" value={propositionDetails?.statusProposicao.descricaoTramitacao} />
        <DetailsGridRow label="ORGÃO" value={propositionDetails?.statusProposicao.siglaOrgao} />
      </DetailsGrid>
    </PropositionTab>
  );
};
