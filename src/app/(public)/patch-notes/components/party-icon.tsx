import { AvanteIcon } from '@/components/icons/avante.svg';
import { CidadaniaIcon } from '@/components/icons/cidadania.svg';
import { MdbIcon } from '@/components/icons/mdb.svg';
import { NovoIcon } from '@/components/icons/novo.svg';
import { PcdobIcon } from '@/components/icons/pcdob.svg';
import { PdtIcon } from '@/components/icons/pdt.svg';
import { PlIcon } from '@/components/icons/pl.svg';
import { PodemosIcon } from '@/components/icons/podemos.svg';
import { PpIcon } from '@/components/icons/pp.svg';
import { PsbIcon } from '@/components/icons/psb.svg';
import { PsdIcon } from '@/components/icons/psd.svg';
import { PsdbIcon } from '@/components/icons/psdb.svg';
import { PsolIcon } from '@/components/icons/psol.svg';
import { PtIcon } from '@/components/icons/pt.svg';
import { PrdIcon } from '@/components/icons/prd.svg';
import { RedeIcon } from '@/components/icons/rede.svg';
import { RepublicanosIcon } from '@/components/icons/republicanos.svg';
import { SolidariedadeIcon } from '@/components/icons/solidariedade.svg';
import { UniaoIcon } from '@/components/icons/uniao.svg';
import React from 'react';
import { PvIcon } from '@/components/icons/pv.svg';

type Props = {
  party: string;
  className?: string;
};

export const PartyIcon = (props: Props) => {
  switch (props.party) {
    case 'PT':
      return <PtIcon className={props.className} />;
    case 'PL':
      return <PlIcon className={props.className} />;
    case 'UNIÃO':
      return <UniaoIcon className={props.className} />;
    case 'REPUBLICANOS':
      return <RepublicanosIcon className={props.className} />;
    case 'PP':
      return <PpIcon className={props.className} />;
    case 'MDB':
      return <MdbIcon className={props.className} />;
    case 'PSD':
      return <PsdIcon className={props.className} />;
    case 'PDT':
      return <PdtIcon className={props.className} />;
    case 'PODE':
      return <PodemosIcon className={props.className} />;
    case 'PSOL':
      return <PsolIcon className={props.className} />;
    case 'PSDB':
      return <PsdbIcon className="h-10 w-10" />;
    case 'PSB':
      return <PsbIcon className={props.className} />;
    case 'PCdoB':
      return <PcdobIcon className={props.className} />;
    case 'AVANTE':
      return <AvanteIcon className={props.className} />;
    case 'PV':
      return <PvIcon className={props.className} />;
    case 'NOVO':
      return <NovoIcon className={props.className} />;
    case 'SOLIDARIEDADE':
      return <SolidariedadeIcon className={props.className} />;
    case 'CIDADANIA':
      return <CidadaniaIcon className={props.className} />;
    case 'REDE':
      return <RedeIcon className={props.className} />;
    case 'PRD':
      return <PrdIcon className={props.className} />;
    default:
      return '?';
  }
};
