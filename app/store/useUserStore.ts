import { create } from "zustand";

interface UserExtraState {
  isPremium: boolean;
  hasLibraryAccess: boolean;
  setPremium: (value: boolean) => void;
  setLibraryAccess: (value: boolean) => void;
  reset: () => void;
}

export const useUserStore = create<UserExtraState>((set) => ({
  isPremium: false,
  hasLibraryAccess: false,

  setPremium: (value) => set({ isPremium: value }),
  setLibraryAccess: (value) => set({ hasLibraryAccess: value }),
  reset: () => set({ isPremium: false, hasLibraryAccess: false }),
}));
