import * as React from 'react';
export const PcdobIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
      <path d="M156.281 0h227.438v540H156.281z" />
    </clipPath>
    <g clipPath="url(#a)">
      <path d="M315.062 437.526c-91.972-28.473-158.781-113.42-158.781-213.671C156.281 100.306 257.753 0 382.739 0c-37.495 52.232-67.938 134.557-67.938 223.855 0 83.573 26.664 161.037 60.82 213.444a281.638 281.638 0 0 0 7.118 10.412v91.624h-67.677V437.526Z" />
    </g>
  </svg>
);
