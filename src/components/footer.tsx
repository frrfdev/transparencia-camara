'use client';

import { useMenuContext } from '@/app/providers/menu-provider';
import { returnFocus } from '@/lib/focusManager';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export const Footer = (props: React.HTMLAttributes<HTMLDivElement>) => {
  const { options } = useMenuContext();
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        returnFocus();
        router.back();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [router]);

  return (
    <footer className="bg-black p-4 flex justify-between" {...props}>
      <div>
        <button
          className="flex gap-2 items-center focus:outline-none hover:text-orange-500 focus:text-orange-500 group"
          onClick={() => {
            returnFocus();
            router.back();
          }}
        >
          <div className="bg-white rounded-full w-6 h-6 max-w-6 flex items-center justify-center">
            <ArrowLeft size={16}></ArrowLeft>
          </div>
          <span
            className="text-white group-hover:text-orange-500 group-focus:text-orange-500 text-md uppercase font-bold"
            tabIndex={10}
          >
            Voltar
          </span>
        </button>
      </div>
      <div className="h-full flex items-center gap-4">
        {options.map((option) => (
          <button
            key={option.key}
            className="flex gap-2 items-center focus:outline-none hover:text-orange-500 focus:text-orange-500 group"
            onClick={() => option.action()}
            tabIndex={10}
          >
            <div className="bg-white rounded-full w-6 h-6 max-w-6 flex items-center justify-center">
              {option.icon}
            </div>
            <span className="text-white group-hover:text-orange-500 group-focus:text-orange-500 text-md uppercase font-bold">
              {option.label}
            </span>
          </button>
        ))}
      </div>
    </footer>
  );
};
