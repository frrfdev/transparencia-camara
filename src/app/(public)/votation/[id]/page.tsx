import { DiagonalBackground } from '@/components/ui/diagonal-background';
import React from 'react';
import { PageTitle } from '@/components/animated/page-title';
import { VotationContent } from '../components/votation-content';

const VotationPage = () => {
  return (
    <div className="w-full h-full flex flex-col bg-main-bg relative">
      <PageTitle title="Detalhes da votação" />
      <DiagonalBackground
        className="flex-grow"
        direction="right"
        outerClassName="fill-sky-500"
        innerClassName="fill-sky-300"
      >
        <VotationContent></VotationContent>
      </DiagonalBackground>
    </div>
  );
};

export default VotationPage;
