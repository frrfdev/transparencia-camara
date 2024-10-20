import React from 'react';

type Props = {
  points?: string;
  color: string;
} & React.SVGProps<SVGSVGElement>;

export const TriangleBorder = ({
  points = '0,0 40,0 0,100',
  color,
  ...props
}: Props) => {
  return (
    <svg
      className="inset-0 h-full min-w-[40px] w-[40px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 50 100"
      preserveAspectRatio="none"
      {...props}
    >
      <polygon points={points} fill={color} />
    </svg>
  );
};
