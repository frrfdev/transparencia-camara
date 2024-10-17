import React from 'react';

type Props = {
  children: React.ReactNode;
  disabled?: boolean;
};

export const InputSound = ({ children, disabled }: Props) => {
  const newChildren = React.Children.map(children, (child) => {
    return React.cloneElement(
      child as React.ReactElement,
      {
        onFocus: (e) => {
          if (!disabled) {
            const focusAudio = new Audio('/assets/audio/focus.wav');
            focusAudio.volume = 0.1;
            focusAudio.play();
          }
          (child as React.ReactElement)?.props?.onFocus?.(e);
        },
      } as React.HTMLAttributes<HTMLDivElement>
    );
  });

  return newChildren;
};
