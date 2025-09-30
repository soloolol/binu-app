import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

type AuthState = {
  isLoggedIn: boolean | undefined;
  login: () => void;
  logout: () => void;
};

const customStorage: StateStorage = {
  getItem: async name => {
    const item = await AsyncStorage.getItem(name);
    console.log('loginV:', item);
    if (item === null) {
      // AsyncStorage에 키가 없거나 값이 null일 때
      return JSON.stringify({state: {isLoggedIn: false}});
    }
    // 기본 동작 유지
    return item;
  },
  setItem: async (name, value) => {
    await AsyncStorage.setItem(name, value);
  },
  removeItem: async name => {
    await AsyncStorage.removeItem(name);
  },
};

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      isLoggedIn: undefined,
      login: () => set({isLoggedIn: true}),
      logout: () => set({isLoggedIn: false}),
    }),
    {
      name: Config.STORAGE_AUTH_KEY!,
      storage: createJSONStorage(() => customStorage),
    },
  ),
);
