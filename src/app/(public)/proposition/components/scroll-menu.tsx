'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { useMenuStore } from '../stores/use-menu-store';

export type ScrollMenuProps = {
  children: React.ReactNode[];
};

export type ScrollMenuButtonProps = {
  icon: React.ReactNode;
  isActive?: boolean;
  setActive?: () => void;
};

export const ScrollMenuButton = ({ icon, isActive = false, setActive }: ScrollMenuButtonProps) => {
  return (
    <button
      data-active={isActive}
      className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 ${
        isActive
          ? 'text-black [&>svg]:size-8 sm:[&>svg]:size-10 md:[&>svg]:size-14'
          : 'text-white focus:opacity-60 hover:opacity-60'
      } rounded-md transition-colors duration-200`}
      onClick={setActive}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setActive?.();
        }
      }}
    >
      {icon}
    </button>
  );
};

export const ScrollMenu = ({ children }: ScrollMenuProps) => {
  const [startIndex, setStartIndex] = useState(0);
  const totalButtons = React.Children.count(children);
  const visibleButtons = 4;

  const activeIndex = useMenuStore((state) => state.activeIndex);
  const setActiveIndex = useMenuStore((state) => state.setActiveIndex);

  const playSound = () => {
    const audio = new Audio('/assets/audio/button.wav');
    audio.volume = 0.05;
    audio.play();
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (activeIndex < visibleButtons - 1) {
        // If not at the last visible button, just move the active index
        setActiveIndex(activeIndex + 1);
      } else {
        // If at the last visible button, scroll and reset active index
        setStartIndex((startIndex + 1) % totalButtons);
        setActiveIndex(0);
      }
    } else {
      if (activeIndex > 0) {
        // If not at the first visible button, just move the active index
        setActiveIndex(activeIndex - 1);
      } else {
        // If at the first visible button, scroll and set active index to last visible
        setStartIndex((startIndex - 1 + totalButtons) % totalButtons);
        setActiveIndex(visibleButtons - 1);
      }
    }
  };

  const getVisibleButtons = () => {
    const buttons = [];
    for (let i = 0; i < visibleButtons; i++) {
      const index = (startIndex + i) % totalButtons;
      buttons.push(React.Children.toArray(children)[index]);
    }
    return buttons;
  };

  useEffect(() => {
    playSound();
  }, [activeIndex]);

  return (
    <div className="relative w-full overflow-hidden">
      <div className="flex items-center justify-between px-1 sm:px-2 py-1">
        <button onClick={() => handleScroll('left')} className="text-white">
          <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </button>
        <div className="flex space-x-1 sm:space-x-2">
          {getVisibleButtons().map((child, index) =>
            React.cloneElement(child as React.ReactElement, {
              key: index,
              isActive: index === activeIndex,
              setActive: () => setActiveIndex(index),
            })
          )}
        </div>
        <button onClick={() => handleScroll('right')} className="text-white">
          <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16" />
        </button>
      </div>
    </div>
  );
};
