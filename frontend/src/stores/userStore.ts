import { create } from "zustand";
import { IUser } from "../models/User";

interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  userAccessToken: string | null;
  setUserAccessToken: (token: string | null) => void;
  userRefreshToken: string | null;
  setUserRefreshToken: (token: string | null) => void;
  logout: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  userAccessToken: window.localStorage.getItem("access") || null,
  setUserAccessToken: (token) => {
    if (token) {
      window.localStorage.setItem("access", token);
    } else {
      window.localStorage.removeItem("access");
    }
    set({ userAccessToken: token });
  },
  userRefreshToken: window.localStorage.getItem("refresh") || null,
  setUserRefreshToken: (token) => {
    if (token) {
      window.localStorage.setItem("refresh", token);
    } else {
      window.localStorage.removeItem("refresh");
    }
    set({ userRefreshToken: token });
  },
  logout: () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    set({ userAccessToken: null, userRefreshToken: null });
  },
}));

export default useUserStore;
