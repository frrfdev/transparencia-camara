'use client';

import React, { useEffect, useState } from 'react';
import { GetPropositionsParams, useGetPropositionsQuery } from '../hooks/api/use-get-propositions.query';
import { usePagination } from '@/hooks/use-pagination';
import { List } from '@/components/ui/list';
import { PropositionDetails } from './proposition-details';
import { useMenuContext } from '@/app/providers/menu-provider';
import { PropositionsFilter } from './propositions-filter';
import { cn } from '@/lib/utils';

export const PropositionsList = () => {
  const { paginationConfig, dispatchPagination } = usePagination();
  const { addOption } = useMenuContext();

  const [selectedPropositionId, setSelectedPropositionId] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const { data: propositions } = useGetPropositionsQuery({
    ...paginationConfig,
    dispatchPagination,
    sort: {
      field: '',
      order: 'desc',
    },
  } as GetPropositionsParams);

  const selectedProposition = propositions?.data?.find((a) => a.id === selectedPropositionId);

  useEffect(() => {
    addOption({
      key: 'y',
      label: 'Filtro',
      icon: 'Y',
      action: () => {
        setIsFilterOpen((old) => !old);
      },
    });
  }, []);

  return (
    <div className="h-full flex gap-2 pb-4 overflow-hidden">
      <List className="flex flex-col p-10 pt-4 gap-4 h-full w-1/2 overflow-y-auto">
        {propositions?.data?.map((proposition) => (
          <button
            className={cn(
              'font-medium flex gap-6 items-center rounded-full bg-white shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] p-4 px-10  border-0 outline-0 hover:bg-orange-200',
              'focus:bg-gradient-to-r from-neutral-950 to-neutral-900 focus:text-white focus:font-bold',
              proposition.id === selectedPropositionId &&
                'bg-gradient-to-r from-neutral-950 to-neutral-900 text-white font-bold'
            )}
            key={proposition.id}
            tabIndex={1}
            onFocus={() => {
              setSelectedPropositionId(proposition.id);
            }}
          >
            <span className="font-bold">{proposition.numero}</span>
            <span className="line-clamp-2">{proposition.ementa}</span>
          </button>
        ))}
      </List>
      {selectedPropositionId && selectedProposition && <PropositionDetails proposition={selectedProposition} />}
      <PropositionsFilter onFilter={() => {}} isOpen={isFilterOpen} />
    </div>
  );
};
