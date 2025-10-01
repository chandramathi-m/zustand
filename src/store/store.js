import { create } from 'zustand';

export const useStoreValue = create((set , get) => ({
    inputValue: [],
    setInputValue: (value) => set((state) => ({ inputValue: value , completed: value.completed })),
    count: 0,
    setCount: (value) => set((state) => ({ count: get().count + 1 })),
}));

