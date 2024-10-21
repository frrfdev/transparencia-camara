import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const SoundFocus = (props: Props) => {
  const newChildren = React.Children.map(props.children, (child) => {
    return React.cloneElement(child as React.ReactElement, {
      onFocus: (e: React.FocusEvent<HTMLDivElement>) => {
        const audio = new Audio('/assets/audio/focus.ogg');
        audio.volume = 0.05;
        audio.play().then(() => {
          audio.remove();
        });
        (child as React.ReactElement).props.onFocus?.(e);
      },
    });
  });

  return <>{newChildren}</>;
};
