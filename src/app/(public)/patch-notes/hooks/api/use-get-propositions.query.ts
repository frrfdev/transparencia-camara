import { PaginatedQueryParams, usePaginatedQuery } from '@/hooks/use-paginated-query';
import { Proposition } from '../../types/Proposition';

export type GetPropositionsParams = PaginatedQueryParams & {
  filter?: {
    id?: string;
    year?: string;
    /** Data do início do intervalo de tempo em que tenha havido tramitação das proposições a serem listadas, no formato AAAA-MM-DD. Se omitido, é assumido como a data de 30 dias anteriores à proposição */
    startDate?: string;
    /** Data do fim do intervalo de tempo em que tenha havido tramitação das proposições a serem listadas. Se omitido, é considerado ser o dia em que é feita a requisição */
    endDate?: string;
    /** Data do início do intervalo de tempo em que tenham sido apresentadas as proposições a serem listadas, no formato AAAA-MM-DD */
    presentationDateStart?: string;
    /** Data do fim do intervalo de tempo em que tenham sido apresentadas as proposições a serem listadas */
    presentationDateEnd?: string;
    /** Um ou mais números identificador(es), separados por vírgula, do(s) deputado(s) autor(es) das proposições que serão listadas. Cada número deve ser o identificador exclusivo de um parlamentar no Dados Abertos */
    authorId?: number[];
    /** Nome ou parte do nome do(s) autor(es) das proposições que se deseja obter. Deve estar entre aspas */
    author?: string;
    /** Uma ou mais sigla(s) separadas por vírgulas do(s) partido(s) a que pertençam os autores das proposições a serem listadas */
    authorPartyAcronym?: string[];
    /** Identificador numérico no Dados Abertos do partido a que pertençam os autores das proposições que serão listadas. Esses identificadores podem ser obtidos em /partidos e são mais precisos do que as siglas, que podem ser usadas por partidos diferentes em épocas diferentes */
    authorPartyId?: number;
    /** Uma ou mais sigla(s) de unidade(s) da federação (estados e Distrito Federal) pela(s) qual(quais) o(s) autor(es) das proposições selecionadas tenha(m) sido eleito(s) */
    authorStateAcronym?: string[];
    /** Uma ou mais palavras chaves sobre o tema a que a proposição se relaciona */
    keywords?: string[];
    /** Indicador booleano, com valor TRUE ou FALSE para trazer apenas proposições que já tenha tramitado no Senado */
    senateOnly?: boolean;
    /** Uma ou mais sigla(s) separadas por vírgulas do(s) tipo(s) das proposições que se deseja obter. A lista de tipos e siglas existentes pode ser obtida em /referencias/proposicoes/siglaTipo	*/
    typeAcronym?: string[];
    /**
     *	Um ou mais número(s), separados por vírgula, oficialmente atribuídos às proposições segundo o art. 137 do Regimento Interno, como "PL 1234/2016"
     *	Exemplo: 1234,1235,1236
     */
    number?: number[];
    /** Código(s) numérico(s), separados por vírgulas, do tipo de situação em que se encontram as proposições que serão listadas. As situações possíveis podem ser obtidas em /referencias/proposicoes/codSituacao. Atenção: este parâmetro pode apresentar resultados inesperados, por problemas com o registro dos dados. */
    codSitation?: number[];
    /** Código(s) numérico(s), separados por vírgulas, das áreas temáticas das proposições que serão listadas. Os temas possíveis podem ser obtidos em /referencias/proposicoes/codTema */
    codTheme?: number[];
  } | null;
};

export const useGetPropositionsQuery = ({ ...params }: GetPropositionsParams) => {
  return usePaginatedQuery<Proposition>({
    queryKey: ['proposicoes', params.current, params.pageSize, params.sort, params.search, params.filter],
    url: `proposicoes`,
    params: {
      ...params,
      filter: {
        siglaTipo: params.filter?.typeAcronym?.join(','),
      },
    },
  });
};
