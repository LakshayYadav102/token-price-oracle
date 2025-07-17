import { create } from 'zustand';

export const usePriceStore = create((set) => ({
  loading: false,
  result: null,
  setLoading: (val) => set({ loading: val }),
  setResult: (data) => set({ result: data }),
}));
