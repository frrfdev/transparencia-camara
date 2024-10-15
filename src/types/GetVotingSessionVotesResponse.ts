export type VotingSessionVotesResponse = {
  dados: Vote[];
  links: Link[];
};

export type Vote = {
  tipoVoto: string;
  dataRegistroVoto: string;
  deputado_: Deputy;
};

export type Deputy = {
  id: number;
  uri: string;
  nome: string;
  siglaPartido: string;
  uriPartido: string;
  siglaUf: string;
  idLegislatura: number;
  urlFoto: string;
  email: string;
};

type Link = {
  rel: string;
  href: string;
};
