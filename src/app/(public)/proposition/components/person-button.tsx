import React from 'react';
import { useGetPersonDetailsQuery } from '../../patch-notes/hooks/api/use-get-person-details.query';
import { PokemonButton } from '@/components/ui/pokemon-button';
import { PartyUtils } from '../../votes/utils/party';
import { PartyIcon } from '../../patch-notes/components/party-icon';
import { GenderIcon } from '../../patch-notes/components/gender-icon';
import { PersonAvatar } from '../../patch-notes/components/person-avatar';
import { cn } from '@/lib/utils';
import { Crown } from 'lucide-react';
import { BrazilSvg } from '@/components/icons/brazil.svg';

type Props = {
  personId: string;
  label: string;
  code: number;
} & React.ComponentProps<typeof PokemonButton>;

export const PersonButton = ({ personId, label, code, ...props }: Props) => {
  const { data: personDetails, isPending } = useGetPersonDetailsQuery({
    personId,
    shouldFetch: code !== 30000,
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
          {code === 30000 ? (
            <Crown></Crown>
          ) : (
            <>
              <PartyIcon
                party={personDetails?.ultimoStatus.siglaPartido ?? ''}
                className={cn(
                  'fill-white group-data-[selected=true]/button:fill-black h-10 w-10'
                )}
              />
              <span>
                {personDetails?.ultimoStatus.siglaPartido.slice(0, 3)}
              </span>
            </>
          )}
        </span>
      }
    >
      <div className="flex  gap-2 items-center">
        {code === 30000 ? (
          <div className=" rounded-full overflow-hidden flex items-center justify-center">
            <BrazilSvg className="rounded-full w-10 h-10 min-w-10 "></BrazilSvg>
          </div>
        ) : (
          <PersonAvatar
            className="h-10 w-10 min-w-[40px]"
            avatarUrl={personDetails?.ultimoStatus?.urlFoto ?? ''}
            name={personDetails?.nomeCivil ?? ''}
          />
        )}
        {personDetails?.ultimoStatus.nomeEleitoral ?? label}
        {code === 30000 ? null : (
          <GenderIcon gender={personDetails?.sexo ?? ''} />
        )}
      </div>
    </PokemonButton>
  );
};
