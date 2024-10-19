export type GetVotingSessionDetailsResponse = {
  dados: VotingSessionDetails;
  links: {
    rel: string;
    href: string;
  }[];
};

export type VotingSessionDetails = {
  aprovacao: number;
  data: string;
  dataHoraRegistro: string;
  dataHoraUltimaAberturaVotacao: string;
  descUltimaAberturaVotacao: string;
  descricao: string;
  efeitosRegistrados: EfeitosRegistrados[];
  id: string;
  idEvento: number;
  idOrgao: number;
  objetosPossiveis: Object[];
  proposicoesAfetadas: Object[];
  siglaOrgao: string;
  ultimaApresentacaoProposicao: Object;
  uri: string;
  uriEvento: string;
  uriOrgao: string;
};

export type EfeitosRegistrados = {
  dataHoraResultado: string;
  dataHoraUltimaAberturaVotacao: string;
  dataHoraUltimaApresentacaoProposicao: string;
  descResultado: string;
  descUltimaAberturaVotacao: string;
  descUltimaApresentacaoProposicao: string;
  tituloProposicao: string;
  tituloProposicaoCitada: string;
  uriProposicao: string;
  uriProposicaoCitada: string;
};

export type Object = {
  ano: number;
  codTipo: number;
  ementa: string;
  id: number;
  numero: number;
  siglaTipo: string;
  uri: string;
};
