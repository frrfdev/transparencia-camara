'use client';

import React from 'react';
import { VotingSessionVotesChartsParams } from '../../proposition/components/voting-session-votes-charts';
import { VotingSessionVotesPersonParams } from '../../proposition/components/voting-session-votes-person';
import { PersonDetails } from '../../proposition/components/person-details';
import { useVotingSessionStore } from '../../proposition/stores/use-voting-session-store';
import { SlideIntoView } from '@/components/animated/slide-into-view';
import { FadeIntoView } from '@/components/animated/fade-into-view';
import { VotationPreview } from './votation-preview';

export const VotationContent = () => {
  const { selectedPersonId } = useVotingSessionStore();

  return (
    <div className="flex h-full w-full relative">
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
      <div className="flex flex-col h-full w-1/3 pb-6 justify-center relative">
        <SlideIntoView shouldHide={!selectedPersonId} direction="right">
          <PersonDetails personId={selectedPersonId} />
        </SlideIntoView>
      </div>
      <VotationPreview />
    </div>
  );
};
