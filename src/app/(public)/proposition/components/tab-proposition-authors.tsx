'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { PropositionTab } from './proposition-tab';
import { useGetPropositionAuthorsQuery } from '../../patch-notes/hooks/api/use-get-proposition-authors.query';
import { PersonButton } from './person-button';
import { usePropositionAuthorsStore } from '../stores/use-proposition-authors-store';
import { PersonDetails } from './person-details';

export const TabPropositionAuthors = () => {
  const params = useParams();
  const { id } = params;
  const { selectedAuthors, setSelectedAuthors } = usePropositionAuthorsStore();

  const { data: authors, isLoading } = useGetPropositionAuthorsQuery({
    propositionId: id as string,
  });

  if (isLoading) return <div>Loading...</div>;

  if (!authors) return <div>No data</div>;

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
