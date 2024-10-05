import React from 'react';
import { PropositionsList } from './components/propositions.list';

export const PatchNotes = () => {
  return (
    <div className="h-screen overflow-hidden">
      <PropositionsList></PropositionsList>
    </div>
  );
};

export default PatchNotes;
