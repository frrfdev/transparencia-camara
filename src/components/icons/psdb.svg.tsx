import * as React from 'react';
export const PsdbIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlSpace="preserve"
    style={{
      fillRule: 'evenodd',
      clipRule: 'evenodd',
      strokeLinejoin: 'round',
      strokeMiterlimit: 2,
    }}
    viewBox="0 0 540 540"
    {...props}
  >
    <clipPath id="a">
      <path d="M0 60.485h540v419.03H0z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="M255.77 63.978c157.022 1.785 283.407 66.592 283.407 146.161H255.77V63.978Z" />
      <circle cx={159.743} cy={135.312} r={74.827} />
      <path d="M132.675 230.404H430.48c0 137.488-111.623 249.111-249.111 249.111-71.456 0-135.925-30.15-181.369-78.413 75.538-.257 136.785-61.663 136.785-137.26 0-11.531-1.426-22.733-4.11-33.438Z" />
    </g>
  </svg>
);
