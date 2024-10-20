import { SlideIntoView } from '@/components/animated/slide-into-view';
import { useGetEventDetailsQuery } from '@/hooks/api/use-get-event-details.query';
import { useGetVotingSessionDetailsQuery } from '@/hooks/api/use-get-voting-session-details.query';
import { getYoutubeVideoId } from '@/lib/utils';
import { X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useVotingSessionStore } from '../../proposition/stores/use-voting-session-store';
import { useMenuContext } from '@/app/providers/menu-provider';

export const VotationPreview = () => {
  const { id } = useParams();
  const { addOption, removeOption, options } = useMenuContext();

  const showVotationReplay = useVotingSessionStore(
    (state) => state.showVotationReplay
  );

  const setShowVotationReplay = useVotingSessionStore(
    (state) => state.setShowVotationReplay
  );

  const { data: votingSessionDetails } = useGetVotingSessionDetailsQuery({
    votingSessionId: id as string,
  });

  const { data: eventDetails } = useGetEventDetailsQuery({
    eventId: votingSessionDetails?.dados?.idEvento?.toString() ?? '',
  });

  useEffect(() => {
    addOption({
      key: 'r',
      icon: 'R',
      label: showVotationReplay ? 'Fechar Replay' : 'Abrir Replay',
      action: () => {
        setShowVotationReplay(!showVotationReplay);
        removeOption('r');
      },
    });

    return () => {
      removeOption('r');
    };
  }, [showVotationReplay]);

  return (
    <div className="h-min w-auto absolute top-0 right-0">
      <SlideIntoView
        // youtube link render iframe
        shouldHide={
          !votingSessionDetails?.dados.uriEvento ||
          !eventDetails?.urlRegistro ||
          !showVotationReplay
        }
        direction="right"
        className="p-0 w-max pt-4 "
      >
        <div className=" p-4 text-white text-lg drop-shadow-lg relative uppercase flex flex-col gap-4 font-bold bg-black/50 rounded-l-lg ">
          <span>Replay da Votação</span>
          <button
            tabIndex={1}
            className="absolute top-2 hover:bg-white hover:text-black p-1 rounded-lg right-2 cursor-pointer"
            onClick={() => setShowVotationReplay(false)}
          >
            <X></X>
          </button>
          <iframe
            allow="autoplay mute fullscreen"
            src={`https://www.youtube.com/embed/${getYoutubeVideoId(
              eventDetails?.urlRegistro ?? ''
            )}?autoplay=1&mute=1`}
            className="w-full h-full"
          ></iframe>
        </div>
      </SlideIntoView>
    </div>
  );
};
