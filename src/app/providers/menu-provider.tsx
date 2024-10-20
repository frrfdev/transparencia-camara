'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export type MenuOption = {
  key: string;
  label: string;
  icon: React.ReactNode;
  action: (e?: KeyboardEvent) => void;
};

export type MenuContextProps = {
  options: MenuOption[];
  addOption: (option: MenuOption) => void;
  removeOption: (key: string) => void;
  resetOptions: () => void;
  addOptions: (options: MenuOption[]) => void;
  removeOptions: (keys: string[]) => void;
};

const MenuContext = createContext<MenuContextProps>({
  options: [],
  addOption: () => {},
  removeOption: () => {},
  resetOptions: () => {},
  addOptions: () => {},
  removeOptions: () => {},
});

export const useMenuContext = () => useContext(MenuContext);

export const MenuProvider = ({ children }: Props) => {
  const [options, setOptions] = useState<MenuOption[]>([]);

  const checkIfOptionExists = (key: string) => {
    return options.find((o) => o.key === key);
  };

  const addOption = (option: MenuOption) => {
    if (checkIfOptionExists(option.key)) {
      console.error('Option with key already exists', option.key);
      return;
    }
    setOptions((prev) => [...prev, option]);
  };

  const addOptions = (options: MenuOption[]) => {
    setOptions((prev) => {
      const updatedOptions = [...prev];

      options.forEach((newOption) => {
        const existingIndex = updatedOptions.findIndex(
          (option) => option.key === newOption.key
        );

        if (existingIndex !== -1) {
          // Replace the existing option
          updatedOptions[existingIndex] = newOption;
        } else {
          // Add the new option
          updatedOptions.push(newOption);
        }
      });

      return updatedOptions;
    });
  };

  const removeOption = (key: string) => {
    setOptions((prev) => prev.filter((o) => o.key !== key));
  };

  const removeOptions = (keys: string[]) => {
    setOptions((prev) => prev.filter((o) => !keys.includes(o.key)));
  };

  const resetOptions = () => {
    setOptions([]);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    const optionWithKey = options.find((o) => o.key === e.key);
    if (optionWithKey) {
      optionWithKey.action(e);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [options]);

  return (
    <MenuContext.Provider
      value={{
        options,
        addOption,
        removeOption,
        resetOptions,
        addOptions,
        removeOptions,
      }}
    >
      <div className="h-full w-full overflow-hidden">{children}</div>
    </MenuContext.Provider>
  );
};
