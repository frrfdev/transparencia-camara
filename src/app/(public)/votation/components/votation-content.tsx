'use client';

import React from 'react';
import { VotingSessionVotesChartsParams } from '../../proposition/components/voting-session-votes-charts';
import { VotingSessionVotesPersonParams } from '../../proposition/components/voting-session-votes-person';
import { PersonDetails } from '../../proposition/components/person-details';
import { useVotingSessionStore } from '../../proposition/stores/use-voting-session-store';
import { SlideIntoView } from '@/components/animated/slide-into-view';
import { FadeIntoView } from '@/components/animated/fade-into-view';
import { VotationPreview } from './votation-preview';
import { cn } from '@/lib/utils';
import { ColorUtils } from '../../votes/utils/colors';

export const VotationContent = () => {
  const { selectedPersonId, selectedPersonVote } = useVotingSessionStore();

  return (
    <div className="flex h-full w-full relative">
      <div className="flex flex-col h-full w-1/3 py-6 pt-[80px] justify-center relative">
        <div className="h-full w-full relative">
          <SlideIntoView
            shouldHide={false}
            direction="left"
            className="w-full h-full"
          >
            <VotingSessionVotesChartsParams />
          </SlideIntoView>
        </div>
      </div>
      <div className="flex flex-col h-full pt-[80px] overflow-hidden w-1/3 py-6 justify-center relative">
        <FadeIntoView shouldHide={false} className="h-full overflow-y-auto">
          <VotingSessionVotesPersonParams />
        </FadeIntoView>
      </div>
      <div className="flex flex-col h-full w-1/3 py-6 pt-[80px]  justify-center relative ">
        <div className="relative h-full w-full">
          <SlideIntoView
            shouldHide={!selectedPersonId}
            direction="right"
            className="h-full p-0 w-full"
          >
            <PersonDetails
              personId={selectedPersonId}
              renderContent={() => {
                return (
                  <div
                    className={cn(
                      'h-[400px] w-full text-4xl font-bold uppercase flex items-center justify-center'
                    )}
                    style={{
                      background:
                        ColorUtils.voteTypeToColor(selectedPersonVote) + '5F',
                      color: ColorUtils.voteTypeToColor(selectedPersonVote),
                    }}
                  >
                    {selectedPersonVote}
                  </div>
                );
              }}
            />
          </SlideIntoView>
        </div>
      </div>
      <VotationPreview />
    </div>
  );
};
