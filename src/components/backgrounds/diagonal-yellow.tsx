import { cn } from '@/lib/utils';
import * as React from 'react';

export type DiagonalBackgroundElementProps = React.SVGProps<SVGSVGElement> & {
  innerClassName?: string;
  outerClassName?: string;
};
export const DiagonalBackgroundElement = ({
  innerClassName,
  outerClassName,
  ...props
}: DiagonalBackgroundElementProps) => (
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
      className={cn('fill-[#ffc700]', outerClassName)}
    />
    <path
      d="M273 0 27.5 540h499V0H273Z"
      className={cn('fill-[#ffd000]', innerClassName)}
    />
  </svg>
);
