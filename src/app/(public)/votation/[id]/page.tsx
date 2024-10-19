import { DiagonalBackground } from '@/components/ui/diagonal-background';
import React from 'react';
import { VotingSessionVotesChartsParams } from '../../proposition/components/voting-session-votes-charts';
import { SlideIntoView } from '@/components/animated/slide-into-view';
import { FadeIntoView } from '@/components/animated/fade-into-view';
import { VotingSessionVotesPersonParams } from '../../proposition/components/voting-session-votes-person';
import { PageTitle } from '@/components/animated/page-title';

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
        <div className="flex h-full w-full">
          <div className="flex flex-col h-full w-1/3 pb-6 justify-center relative">
            <SlideIntoView shouldHide={false} direction="left">
              <VotingSessionVotesChartsParams />
            </SlideIntoView>
          </div>
          <div className="flex flex-col h-full w-1/3 pb-6 justify-center relative">
            <FadeIntoView shouldHide={false}>
              <VotingSessionVotesPersonParams />
            </FadeIntoView>
          </div>
        </div>
      </DiagonalBackground>
    </div>
  );
};

export default VotationPage;
