import { createStore } from '../state/vanillaStore.js';

export const todoStore = createStore((set) => ({
  items: [],
  addItem: (item) => set((prev) => ({ items: [...prev.items, item] })),
  deleteItem: (idx) =>
    set((prev) => ({
      items: [...prev.items.slice(0, idx), ...prev.items.slice(idx + 1)],
    })),
}));
