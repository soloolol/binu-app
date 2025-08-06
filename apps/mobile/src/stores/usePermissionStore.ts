import {create} from 'zustand';
import {persist, createJSONStorage} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PERMISSION_KEY = 'binu-permission-storage';

type PermissionState = {
  hasPermissions: boolean | undefined;
  setPermissions: (value: boolean) => void;
};

export const usePermissionStore = create<PermissionState>()(
  persist(
    set => ({
      hasPermissions: undefined,
      setPermissions: value => set({hasPermissions: value}),
    }),
    {
      name: PERMISSION_KEY,
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
