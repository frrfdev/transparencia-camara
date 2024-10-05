import React from 'react';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const List = ({ children, ...props }: Props) => {
  // const currentFocusedChildren = React.Children.toArray(children).filter(
  //   (child) => React.isValidElement(child) && child.props.isFocused
  // );

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

  return <div {...props}>{newChildren}</div>;
};
