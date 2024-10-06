'use client';

import { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export type MenuOption = {
  key: string;
  label: string;
  icon: React.ReactNode;
  action: () => void;
};

export type MenuContextProps = {
  options: MenuOption[];
  addOption: (option: MenuOption) => void;
  removeOption: (key: string) => void;
  resetOptions: () => void;
};

const MenuContext = createContext<MenuContextProps>({
  options: [],
  addOption: () => {},
  removeOption: () => {},
  resetOptions: () => {},
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }: Props) => {
  const [options, setOptions] = useState<MenuOption[]>([]);

  const addOption = (option: MenuOption) => {
    if (options.find((o) => o.key === option.key)) {
      console.error('Option with key already exists', option.key);
      return;
    }
    setOptions((prev) => [...prev, option]);
  };

  const removeOption = (key: string) => {
    setOptions((prev) => prev.filter((o) => o.key !== key));
  };

  const resetOptions = () => {
    setOptions([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const optionWithKey = options.find((o) => o.key === e.key);
    if (optionWithKey) {
      optionWithKey.action();
    }
  };

  return (
    <MenuContext.Provider value={{ options, addOption, removeOption, resetOptions }}>
      <div className="h-full w-full overflow-hidden" onKeyDown={handleKeyDown}>
        {children}
      </div>
    </MenuContext.Provider>
  );
};
