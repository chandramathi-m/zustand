import { create } from 'zustand';

export const useStoreValue = create((set) => ({
    inputValue: [],
    setInputValue: (value) => set((state) => ({ inputValue: value , completed: value.completed }))
}));

