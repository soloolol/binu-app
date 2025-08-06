import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_KEY = 'binu-auth-storage';

type AuthState = {
  isLoggedIn: boolean | undefined;
  hasHydrated: boolean;
  login: () => void;
  logout: () => void;
  setHasHydrated: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: undefined,
      hasHydrated: false,
      login: () => set({isLoggedIn: true}),
      logout: () => set({isLoggedIn: false}),
      setHasHydrated: () => set({hasHydrated: true}),
    }),
    {
      name: AUTH_KEY,
      storage: createJSONStorage(() => AsyncStorage),
      onRehydrateStorage: () => state => {
        state?.setHasHydrated(); // hydration 완료 시
      },
    },
  ),
);
