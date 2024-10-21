import React, { useCallback, useEffect } from 'react';
import { useVotingSessionStore } from '../stores/use-voting-session-store';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

const VISUALIZATION_VALUES = ['charts', 'person'];

export const VotingSessionVisualizationMenu = () => {
  const selectedVisualization = useVotingSessionStore(
    (state) => state.selectedVisualization
  );
  const setSelectedVisualization = useVotingSessionStore(
    (state) => state.setSelectedVisualization
  );

  const changeVisualization = useCallback(
    (direction: 'up' | 'down') => {
      const currentIndex = VISUALIZATION_VALUES.indexOf(selectedVisualization);

      const nextIndex =
        direction === 'up'
          ? currentIndex > 0
            ? currentIndex - 1
            : VISUALIZATION_VALUES.length - 1
          : currentIndex < VISUALIZATION_VALUES.length - 1
          ? currentIndex + 1
          : 0;
      const audio = new Audio('/assets/audio/decline.wav');
      audio.volume = 0.05;
      audio.play().then(() => {
        audio.remove();
      });
      setSelectedVisualization(
        VISUALIZATION_VALUES[nextIndex] as 'charts' | 'person'
      );
    },
    [selectedVisualization, setSelectedVisualization]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        changeVisualization(e.key === 'ArrowUp' ? 'up' : 'down');
      }
    },
    [changeVisualization]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div className="w-full flex h-full flex-col justify-center relative py-4">
      <div className="w-full h-full flex items-center">
        <svg
          className="inset-0  min-h-[40px] h-[40px]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 50 60"
          preserveAspectRatio="none"
        >
          <polygon
            points="0,0 50,0 50,60"
            fill="black"
            className="shadow-soft"
          />
        </svg>

        <div className="flex relative items-center h-[40px] p-2 w-full bg-black shadow-soft text-white font-bold">
          Visualizar por:&nbsp;
          {(() => {
            switch (selectedVisualization) {
              case 'charts':
                return <div>Gráficos</div>;
              case 'person':
                return <div>Pessoas</div>;
            }
          })()}
          <ChevronUpIcon
            viewBox="0 0 24 24"
            preserveAspectRatio=""
            strokeWidth={5}
            tabIndex={1}
            onClick={() => changeVisualization('up')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                changeVisualization('up');
              }
            }}
            className="text-white left-1/2 -translate-x-1/2 -top-2 -translate-y-1/2 stroke-red-500 absolute cursor-pointer hover:scale-110 hover:stroke-red-300 transition-all duration-300"
            size={30}
          ></ChevronUpIcon>
          <ChevronDownIcon
            viewBox="0 0 24 24"
            preserveAspectRatio=""
            tabIndex={1}
            strokeWidth={5}
            onClick={() => changeVisualization('down')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                changeVisualization('down');
              }
            }}
            className="text-white left-1/2 -translate-x-1/2 -bottom-2 translate-y-1/2 stroke-red-500  absolute cursor-pointer hover:scale-110 hover:stroke-red-300 transition-all duration-300"
            size={30}
          ></ChevronDownIcon>
        </div>
      </div>
    </div>
  );
};
