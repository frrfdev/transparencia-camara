import { PaginatedRequestApi } from '@/types/api/PaginatedRequestApi';
import { Proposition } from './Proposition';
import { PaginatedRequest } from '@/types/PaginatedRequest';

export type PaginatedPropositionResponseApi = PaginatedRequestApi<Proposition>;
export type PaginatedPropositionResponse = PaginatedRequest<Proposition>;
