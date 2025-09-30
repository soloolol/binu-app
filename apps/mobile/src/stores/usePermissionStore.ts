import {create} from 'zustand';
import {persist, createJSONStorage, StateStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';

type PermissionState = {
  hasPermissions: boolean | undefined;
  setHasPermissions: (value: boolean) => void;
};

const customStorage: StateStorage = {
  getItem: async name => {
    const item = await AsyncStorage.getItem(name);
    console.log('permissionV:', item);
    if (item === null) {
      // AsyncStorage에 키가 없거나 값이 null일 때
      return JSON.stringify({state: {hasPermissions: false}});
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

export const usePermissionStore = create<PermissionState>()(
  persist(
    set => ({
      hasPermissions: undefined,
      setHasPermissions: value => set({hasPermissions: value}),
    }),
    {
      name: Config.STORAGE_PERMISSION_KEY!,
      storage: createJSONStorage(() => customStorage),
    },
  ),
);
