'use client';

import { useMenuContext } from '@/app/providers/menu-provider';
import { ArrowLeft } from 'lucide-react';
import React from 'react';

export const Footer = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { options } = useMenuContext();

  return (
    <footer className="bg-black p-4 flex justify-between" {...props}>
      <button className="flex gap-2 items-center focus:outline-none hover:text-orange-500 focus:text-orange-500 group">
        <div className="bg-white rounded-full w-6 h-6 max-w-6 flex items-center justify-center">
          <ArrowLeft size={16}></ArrowLeft>
        </div>
        <span className="text-white group-hover:text-orange-500 group-focus:text-orange-500 text-md uppercase font-bold">
          Voltar
        </span>
      </button>
      <div className="h-full flex items-center gap-2">
        {options.map((option) => (
          <button
            key={option.key}
            className="flex gap-2 items-center focus:outline-none hover:text-orange-500 focus:text-orange-500 group"
          >
            <div className="bg-white rounded-full w-6 h-6 max-w-6 flex items-center justify-center">{option.icon}</div>
            <span className="text-white group-hover:text-orange-500 group-focus:text-orange-500 text-md uppercase font-bold">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </footer>
  );
};