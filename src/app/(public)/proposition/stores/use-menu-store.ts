import { create } from 'zustand';

interface MenuStore {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

export const useMenuStore = create<MenuStore>()((set) => ({
  activeIndex: 0,
  setActiveIndex: (index) => set({ activeIndex: index }),
}));
