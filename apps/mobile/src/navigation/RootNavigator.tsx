import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import PermissionNavigator from './PermissionNavigator';

import {useAuthStore} from '../stores/useAuthStore';
import {usePermissionStore} from '../stores/usePermissionStore';
import OnboardingScreen from '../screens/OnboardingScreen';
import {useEffect} from 'react';
import fetchTagDefinitions from '@/lib/fetchTagDefinitions';
import {useTagStore} from '@/stores/tagStore';

export default function RootNavigator() {
  const {isLoggedIn, hasHydrated} = useAuthStore();
  const hasPermissions = usePermissionStore(state => state.hasPermissions);
  const setTagDefinitions = useTagStore(state => state.setTagDefinitions);

  useEffect(() => {
    const initTags = async () => {
      try {
        const tags = await fetchTagDefinitions();
        setTagDefinitions(tags);
      } catch (error) {
        console.error('태그 정보를 불러오지 못했습니다:', error);
      }
    };

    if (isLoggedIn && hasPermissions) {
      initTags();
    }
  }, [isLoggedIn, hasPermissions]);

  if (!hasHydrated) {
    return <OnboardingScreen />;
  }
  if (isLoggedIn && hasPermissions) {
    return <MainNavigator />;
  }
  if (isLoggedIn) return <PermissionNavigator />;
  return <AuthNavigator />;
}
