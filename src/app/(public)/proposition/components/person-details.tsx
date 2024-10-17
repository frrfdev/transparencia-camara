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

type Props = {
  personId: string;
};

export const PersonDetails = ({ personId }: Props) => {
  const { data: personDetails, isPending } = useGetPersonDetailsQuery({
    personId,
  });

  return (
    <div className="p-4 overflow-y-auto w-full flex flex-col gap-4 items-center">
      <DetailsGridHeader>
        {personDetails?.ultimoStatus?.nomeEleitoral}
      </DetailsGridHeader>
      <PersonAvatar
        className="rounded-none h-[120px] w-[120px]"
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
    </div>
  );
};
