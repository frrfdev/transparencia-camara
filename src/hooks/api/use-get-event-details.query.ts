'use client';

import { useQuery } from '@tanstack/react-query';
import { api } from '@/lib/api';
import { GetEventDetailsResponse } from '@/types/GetEventDetailsResponse';
import { EventDetails } from '@/types/EventDetails';

type UseGetEventDetailsQueryProps = {
  eventId: string;
};

export const useGetEventDetailsQuery = ({
  eventId,
}: UseGetEventDetailsQueryProps) => {
  return useQuery<EventDetails>({
    queryKey: ['eventDetails', eventId],
    queryFn: async () => {
      const response = await api.get<GetEventDetailsResponse>(
        `https://dadosabertos.camara.leg.br/api/v2/eventos/${eventId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );
      return response.data?.dados ?? null;
    },
    enabled: !!eventId,
  });
};
