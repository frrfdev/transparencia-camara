import React from 'react';
import { useGetPersonDetailsQuery } from '../../patch-notes/hooks/api/use-get-person-details.query';
import { PokemonButton } from '@/components/ui/pokemon-button';
import { PartyUtils } from '../../votes/utils/party';
import { PartyIcon } from '../../patch-notes/components/party-icon';
import { GenderIcon } from '../../patch-notes/components/gender-icon';
import { PersonAvatar } from '../../patch-notes/components/person-avatar';

type Props = {
  personId: string;
} & React.ComponentProps<typeof PokemonButton>;

export const PersonButton = ({ personId, ...props }: Props) => {
  const { data: personDetails, isPending } = useGetPersonDetailsQuery({
    personId,
  });

  return (
    <PokemonButton
      {...props}
      isLoading={isPending}
      skeletonColor="#f0f0f0"
      color={PartyUtils.partyToColor(
        personDetails?.ultimoStatus.siglaPartido ?? ''
      )}
      detailRender={
        <span className="flex flex-col gap-1">
          <PartyIcon
            party={personDetails?.ultimoStatus.siglaPartido ?? ''}
            className="fill-white group-data-[selected=true]/button:fill-black h-10 w-10"
          />
          <span>{personDetails?.ultimoStatus.siglaPartido.slice(0, 3)}</span>
        </span>
      }
    >
      <div className="flex  gap-2 items-center">
        <PersonAvatar
          className="h-10 w-10 min-w-[40px]"
          avatarUrl={personDetails?.ultimoStatus?.urlFoto ?? ''}
          name={personDetails?.nomeCivil ?? ''}
        />
        {personDetails?.ultimoStatus.nomeEleitoral}
        <GenderIcon gender={personDetails?.sexo ?? ''} />
      </div>
    </PokemonButton>
  );
};
