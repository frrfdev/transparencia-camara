export type ProjectVotingSessionsResponse = {
  dados: VotingSession[];
  links: Link[];
};

export type VotingSession = {
  id: string;
  uri: string;
  data: string;
  dataHoraRegistro: string;
  siglaOrgao: string;
  uriOrgao: string;
  uriEvento: string;
  proposicaoObjeto: string;
  uriProposicaoObjeto: string;
  descricao: string;
  aprovacao: number;
};

type Link = {
  rel: string;
  href: string;
};
