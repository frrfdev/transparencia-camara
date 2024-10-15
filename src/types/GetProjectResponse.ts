export type GetProjectResponse = {
  dados: {
    id: number;
    uri: string;
    siglaTipo: string;
    codTipo: number;
    numero: number;
    ano: number;
    ementa: string;
    dataApresentacao: string;
    uriOrgaoNumerador: string;
    statusProposicao: {
      dataHora: string;
      sequencia: number;
      siglaOrgao: string;
      uriOrgao: string;
      uriUltimoRelator: string;
      regime: string;
      descricaoTramitacao: string;
      codTipoTramitacao: string;
      descricaoSituacao: string;
      codSituacao: string;
      despacho: string;
      url: string;
      ambito: string;
      apreciacao: string;
    };
    uriAutores: string;
    descricaoTipo: string;
    ementaDetalhada: string;
    keywords: string;
    uriPropPrincipal: string;
    uriPropAnterior: string;
    uriPropPosterior: string;
    urlInteiroTeor: string;
    urnFinal: string;
    texto: string;
    justificativa: string;
  };
  links: {
    rel: string;
    href: string;
  }[];
};
