'use client';

import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { useMenuStore } from '../../app/(public)/proposition/stores/use-menu-store';
import { useMenuContext } from '@/app/providers/menu-provider';

export type ScrollMenuProps = {
  children: React.ReactNode[];
};

export type ScrollMenuButtonProps = {
  icon: React.ReactNode;
  isActive?: boolean;
  setActive?: () => void;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const ScrollMenuButton = forwardRef<
  HTMLButtonElement,
  ScrollMenuButtonProps
>(({ icon, isActive = false, setActive, disabled, ...props }, ref) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (isActive) {
      buttonRef.current?.focus();
    }
  }, [isActive, buttonRef]);

  return (
    <button
      {...props}
      ref={(node) => {
        buttonRef.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      }}
      disabled={disabled}
      data-active={isActive}
      className={`flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 disabled:opacity-50 ${
        isActive
          ? 'text-black [&>svg]:size-8 sm:[&>svg]:size-10 md:[&>svg]:size-14'
          : 'text-white focus:opacity-60 hover:opacity-60'
      } rounded-md transition-colors duration-200`}
      onClick={disabled ? undefined : setActive}
      onKeyDown={(e) => {
        if (disabled) return;
        if (e.key === 'Enter' || e.key === ' ') {
          setActive?.();
        }
      }}
    >
      {icon}
    </button>
  );
});

ScrollMenuButton.displayName = 'ScrollMenuButton';

export const ScrollMenu = ({ children }: ScrollMenuProps) => {
  const { addOptions, removeOptions } = useMenuContext();

  const [startIndex, setStartIndex] = useState(0);

  const totalButtons = React.Children.count(children);
  const visibleButtons = 3;

  const activeIndex = useMenuStore((state) => state.activeIndex);
  const setActiveIndex = useMenuStore((state) => state.setActiveIndex);

  const playSound = () => {
    const audio = new Audio('/assets/audio/button.wav');
    audio.volume = 0.05;
    audio.play().then(() => {
      audio.remove();
    });
  };

  const handleScroll = (direction: 'left' | 'right') => {
    if (direction === 'right') {
      if (activeIndex < visibleButtons - 1) {
        setActiveIndex(activeIndex + 1);
      } else {
        setStartIndex((startIndex + 1) % totalButtons);
        setActiveIndex(0);
      }
    } else {
      if (activeIndex > 0) {
        setActiveIndex(activeIndex - 1);
      } else {
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

  useEffect(() => {
    addOptions([
      {
        key: 'ArrowLeft',
        label: 'Aba Anterior',
        action: () => handleScroll('left'),
        icon: <ArrowLeft />,
      },
      {
        key: 'ArrowRight',
        label: 'Próxima Aba',
        action: () => handleScroll('right'),
        icon: <ArrowRight />,
      },
    ]);

    return () => {
      removeOptions(['ArrowRight', 'ArrowLeft']);
    };
  }, [activeIndex]);

  return (
    <div
      className="relative w-full overflow-hidden"
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          e.stopPropagation();
          handleScroll('right');
        } else if (e.key === 'ArrowLeft') {
          e.preventDefault();
          e.stopPropagation();
          handleScroll('left');
        }
      }}
    >
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
