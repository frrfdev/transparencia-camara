import { cn } from '@/lib/utils';
import React from 'react';

export type DetailsGridRowProps = {
  label: string;
  value?: string | number;
};

export const DetailsGridRow = ({ label, value }: DetailsGridRowProps) => {
  return (
    <tr className="border-b-2 border-gray-400/50 last-of-type:border-none">
      <td className="bg-gray-300 text-center text-black p-2 w-1/2 font-bold">{label}</td>
      <td className="bg-white text-black p-2 w-1/2">{value ?? '-'}</td>
    </tr>
  );
};

export const DetailsGrid = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLTableElement>) => {
  return (
    <table className={cn('drop-shadow-md w-full', className)} {...props}>
      {children}
    </table>
  );
};

export const DetailsGridHeader = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('bg-gray-300 font-bold text-black w-full p-2 text-center drop-shadow-md', className)} {...props}>
      {children}
    </div>
  );
};

export const DetailsGridContent = ({
  children,
  className,
  ...props
}: { children: React.ReactNode } & React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={cn('max-h-[150px] flex-col overflow-y-auto flex bg-white w-full', className)} {...props}>
      {children}
    </div>
  );
};
