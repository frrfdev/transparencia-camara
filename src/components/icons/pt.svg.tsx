import * as React from 'react';
export const PtIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      <path d="M0 13.468h540v513.064H0z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="m269.593 13.468 63.643 195.871h205.952L372.569 330.395l63.643 195.872L269.593 405.21 102.976 526.267l63.643-195.872L0 209.339h205.952l63.641-195.871Z" />
    </g>
  </svg>
);
