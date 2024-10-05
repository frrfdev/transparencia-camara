'use client';

import React, { useState } from 'react';
import {
  GetPropositionsParams,
  useGetPropositionsQuery,
} from '../hooks/api/use-get-propositions.query';
import { usePagination } from '@/hooks/use-pagination';
import { List } from '@/components/ui/list';
import { DiagonalBackground } from '@/components/ui/diagonal-background';

export const PropositionsList = () => {
  const { paginationConfig, dispatchPagination } = usePagination();
  const [selectedPropositionId, setSelectedPropositionId] = useState<
    number | null
  >(null);

  const { data: propositions } = useGetPropositionsQuery({
    ...paginationConfig,
    dispatchPagination,
    sort: {
      field: '',
      order: 'desc',
    },
  } as GetPropositionsParams);

  const selectedProposition = propositions?.data?.find(
    (a) => a.id === selectedPropositionId
  );

  return (
    <DiagonalBackground>
      <div className="h-full flex gap-2">
        <List className="flex flex-col p-10 gap-4 h-full w-1/2 overflow-y-auto">
          {propositions?.data?.map((a) => (
            <button
              className="font-medium rounded-full bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] focus:shadow-[rgba(249,_115,_22,_0.4)_0px_0px_16px] p-4 px-10 focus:bg-gradient-to-r from-orange-500 to-orange-400 focus:text-white focus:font-bold border-0 outline-0 hover:bg-orange-200	"
              key={a.id}
              onFocus={() => {
                setSelectedPropositionId(a.id);
              }}
            >
              <span className="line-clamp-2">{a.ementa}</span>
            </button>
          ))}
        </List>
        {selectedPropositionId && (
          <div className="h-full w-1/2 p-10">
            <div className="h-full w-full backdrop-blur-md bg-white p-10 shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] rounded-lg">
              <div>{selectedProposition?.ementa}</div>
            </div>
          </div>
        )}
      </div>
    </DiagonalBackground>
  );
};
