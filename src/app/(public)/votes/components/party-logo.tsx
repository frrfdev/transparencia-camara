import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

type Props = {
  party: string;
};

const partyLogos = {
  PL: {
    src: '/assets/images/partidos/pl-logo.jpg',
    alt: 'PL',
  },
  PT: {
    src: '/assets/images/partidos/pt-logo.png',
    alt: 'PT',
  },
  UNIÃO: {
    src: '/assets/images/partidos/uniao-logo.jpg',
    alt: 'UNIÃO',
  },
  REPUBLICANOS: {
    src: '/assets/images/partidos/republicanos-logo.png',
    alt: 'REPUBLICANOS',
  },
  PP: {
    src: '/assets/images/partidos/pp-logo.png',
    alt: 'PP',
  },
  MDB: {
    src: '/assets/images/partidos/mdb-logo.jpg',
    alt: 'MDB',
  },
  PSD: {
    src: '/assets/images/partidos/psd-logo.jpg',
    alt: 'PSD',
  },
  PDT: {
    src: '/assets/images/partidos/pdt-logo.png',
    alt: 'PDT',
  },
  PODE: {
    src: '/assets/images/partidos/podemos-logo.png',
    alt: 'PODEMOS',
  },
  PSOL: {
    src: '/assets/images/partidos/psol-logo.png',
    alt: 'PSOL',
  },
  PSDB: {
    src: '/assets/images/partidos/psdb-logo.jpg',
    alt: 'PSDB',
  },
  PSB: {
    src: '/assets/images/partidos/psb-logo.jpg',
    alt: 'PSB',
  },
  PCdoB: {
    src: '/assets/images/partidos/pcdob-logo.png',
    alt: 'PCdoB',
  },
  AVANTE: {
    src: '/assets/images/partidos/avante-logo.png',
    alt: 'AVANTE',
  },
  PV: {
    src: '/assets/images/partidos/pv-logo.png',
    alt: 'PV',
  },
  NOVO: {
    src: '/assets/images/partidos/novo-logo.png',
    alt: 'NOVO',
  },
  SOLIDARIEDADE: {
    src: '/assets/images/partidos/solidariedade-logo.jpg',
    alt: 'SOLIDARIEDADE',
  },
  PRD: {
    src: '/assets/images/partidos/prd-logo.jpg',
    alt: 'PRD',
  },
  CIDADANIA: {
    src: '/assets/images/partidos/cidadania-logo.png',
    alt: 'CIDADANIA',
  },
  REDE: {
    src: '/assets/images/partidos/rede-logo.jpg',
    alt: 'REDE',
  },
};

export const PartyLogo = ({ party }: Props) => {
  const logoData = partyLogos[party as keyof typeof partyLogos];
  if (!logoData) return null;

  return (
    <Image
      src={logoData.src}
      alt={logoData.alt}
      width={50}
      height={50}
      className={cn(party === 'PDT' && 'bg-white')}
    />
  );
};
