import { create } from "zustand";


const useDistanceStore = create((set) => ({
  
  distances: [],      
  selectedDistance: 0, 


  addDistance: (value) =>
    set((state) => ({ distances: [...state.distances, value] })),

  setSelectedDistance: (value) =>
    set(() => ({ selectedDistance: value })),

  clearDistances: () => set({ distances: [] }),
}));

export default useDistanceStore;
