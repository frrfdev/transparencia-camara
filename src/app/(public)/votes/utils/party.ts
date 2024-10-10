const partyColors = {
  PT: '#DC2626',
  PL: '#6366F1',
  UNIÃO: '#93C5FD',
  REPUBLICANOS: '#15803D',
  PP: '#2563EB',
  MDB: '#C2410C',
  PSD: '#65A30D',
  PDT: '#F87171',
  PODE: '#A855F7',
  PSOL: '#EAB308',
  PSDB: '#D4D4D4',
  PSB: '#D97706',
  PCdoB: '#E11D48',
  AVANTE: '#64748B',
  PV: '#22C55E',
  NOVO: '#F97316',
  SOLIDARIEDADE: '#CA8A04',
  CIDADANIA: '#EC4899',
  REDE: '#10B981',
  PRD: '#0D9488',
};

export const PartyUtils = {
  partyToColor: (party: string) => {
    return partyColors[party as keyof typeof partyColors];
  },
};
