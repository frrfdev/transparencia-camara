import * as React from 'react';
export const DiagonalYellow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 527 540"
    {...props}
  >
    <path
      d="M245.5 0 0 540h526.5V0h-281Z"
      style={{
        fill: '#ffc700',
      }}
    />
    <path
      d="M273 0 27.5 540h499V0H273Z"
      style={{
        fill: '#ffd000',
      }}
    />
  </svg>
);
