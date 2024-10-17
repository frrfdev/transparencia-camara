'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PropositionTab } from './proposition-tab';
import { useGetPropositionAuthorsQuery } from '../../patch-notes/hooks/api/use-get-proposition-authors.query';
import { PersonButton } from './person-button';
import { usePropositionAuthorsStore } from '../stores/use-proposition-authors-store';
import { PersonDetails } from './person-details';
import { TabPropositionAuthorsSkeleton } from './tab-proposition-authors-skeleton';

export const TabPropositionAuthors = () => {
  const params = useParams();
  const { id } = params;
  const { selectedAuthors, setSelectedAuthors } = usePropositionAuthorsStore();

  const {
    data: authors,
    isLoading,
    isPending,
  } = useGetPropositionAuthorsQuery({
    propositionId: id as string,
  });

  if (isLoading || isPending) return <TabPropositionAuthorsSkeleton />;

  if (!authors)
    return (
      <PropositionTab className="p-4 flex gap-4 overflow-hidden h-full">
        <div className="h-full w-full flex justify-center items-center font-bold uppercase text-gray-800 opacity-50 text-4xl md:text-[10rem] text-center p-6 leading-[100%]">
          Nenhum Autor
        </div>
      </PropositionTab>
    );

  return (
    <PropositionTab className="flex gap-4 overflow-hidden h-full w-full">
      <div className="w-1/2 h-full flex flex-col gap-2 p-4">
        {authors.map((author) => {
          const id = author.uri.split('/').pop();
          if (!id) return null;
          return (
            <PersonButton
              key={id}
              personId={id ?? ''}
              label={author.nome}
              code={author.codTipo}
              isSelected={selectedAuthors.includes(id)}
              onFocus={() => {
                setSelectedAuthors(id);
              }}
            />
          );
        })}
      </div>
      <div className="w-1/2 h-full flex flex-col gap-2 ">
        {selectedAuthors ? <PersonDetails personId={selectedAuthors} /> : null}
      </div>
    </PropositionTab>
  );
};
