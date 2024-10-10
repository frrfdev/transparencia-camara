import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const InputSound = ({ children }: Props) => {
  const newChildren = React.Children.map(children, (child) => {
    return React.cloneElement(
      child as React.ReactElement,
      {
        onFocus: (e) => {
          const focusAudio = new Audio('/assets/audio/focus.wav');
          focusAudio.volume = 0.1;
          focusAudio.play();
          (child as React.ReactElement)?.props?.onFocus?.(e);
        },
      } as React.HTMLAttributes<HTMLDivElement>
    );
  });

  return newChildren;
};
