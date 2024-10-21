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
  const { addOption, removeOption } = useMenuContext();

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
    if (showVotationReplay) {
      const audio = new Audio('/assets/audio/focus.wav');
      audio.volume = 0.05;
      audio.play();
    } else {
      const audio = new Audio('/assets/audio/close.mp3');
      audio.volume = 0.05;
      audio.play();
    }
  }, [showVotationReplay]);

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
    <div className="h-min w-full bg-red-600 absolute top-0 right-0">
      <SlideIntoView
        shouldHide={
          !votingSessionDetails?.dados.uriEvento ||
          !eventDetails?.urlRegistro ||
          !showVotationReplay
        }
        direction="right"
        className="p-0 h-min pt-4 "
      >
        <div className="w-[400px] aspect-video p-4 text-white text-lg drop-shadow-lg relative uppercase flex flex-col gap-4 font-bold bg-black/50 rounded-l-lg ">
          <span>Replay da Votação</span>
          <button
            tabIndex={1}
            className="absolute top-2 hover:bg-white hover:text-black p-1 rounded-lg right-2 cursor-pointer"
            onClick={() => {
              setShowVotationReplay(false);
              removeOption('r');
            }}
          >
            <X></X>
          </button>
          <iframe
            allow="autoplay mute fullscreen"
            src={`https://www.youtube.com/embed/${getYoutubeVideoId(
              eventDetails?.urlRegistro ?? ''
            )}?autoplay=1&mute=1`}
            className="  h-full"
          ></iframe>
        </div>
      </SlideIntoView>
    </div>
  );

  return (
    <div className="h-min w-auto absolute top-0 right-0">
      <SlideIntoView
        shouldHide={
          !votingSessionDetails?.dados.uriEvento ||
          !eventDetails?.urlRegistro ||
          !showVotationReplay
        }
        direction="right"
        className="p-0 w-full h-min pt-4 "
      >
        <div className=" p-4 w-[200px] text-white text-lg drop-shadow-lg relative uppercase flex flex-col gap-4 font-bold bg-black/50 rounded-l-lg ">
          <span>Replay da Votação</span>
          <button
            tabIndex={1}
            className="absolute top-2 hover:bg-white hover:text-black p-1 rounded-lg right-2 cursor-pointer"
            onClick={() => {
              setShowVotationReplay(false);
              removeOption('r');
            }}
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
