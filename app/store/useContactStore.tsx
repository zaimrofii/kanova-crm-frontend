import { create } from "zustand";

interface ContactStore {
  selectedId: string | null;
  setSelectedId: (id: string) => void;
  clearSelectedId: () => void;
}

export const useContactStore = create<ContactStore>((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
  clearSelectedId: () => set({ selectedId: null }),
}));
