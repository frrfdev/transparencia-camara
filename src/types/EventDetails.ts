import { ChamberLocation } from './ChamberLocation';
import { GovernmentAgency } from './GovernmentAgency';

export interface EventDetails {
  uriDeputados: string | null;
  uriConvidados: string | null;
  fases: string | null;
  id: number;
  uri: string;
  dataHoraInicio: string;
  dataHoraFim: string;
  situacao: string;
  descricaoTipo: string;
  descricao: string;
  localExterno: string | null;
  orgaos: GovernmentAgency[];
  requerimentos: string[];
  localCamara: ChamberLocation;
  urlDocumentoPauta: string;
  urlRegistro: string;
}
