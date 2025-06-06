import { create } from "zustand";

interface AuthState {
  phoneNumber: string | null;
  setPhoneNumber: (by: string | null) => void;

  token: string | null;
  setToken: (by: string | null) => void;
}

export const useAuthStore = create<AuthState>()((set) => ({
  phoneNumber: "",
  setPhoneNumber: (by) => set(() => ({ phoneNumber: by })),

  token: "",
  setToken: (by) => set(() => ({ token: by })),
}));
