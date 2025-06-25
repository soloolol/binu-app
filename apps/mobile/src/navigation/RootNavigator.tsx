import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import PermissionNavigator from './PermissionNavigator';

import {useAuthStore} from '../stores/useAuthStore';
import {usePermissionStore} from '../stores/usePermissionStore';
import OnboardingScreen from '../screens/OnboardingScreen';

export default function RootNavigator() {
  const {isLoggedIn, hasHydrated} = useAuthStore();
  const hasPermissions = usePermissionStore(state => state.hasPermissions);

  if (!hasHydrated) {
    return <OnboardingScreen />;
  }
  if (isLoggedIn && hasPermissions) {
    return <MainNavigator />;
  }
  if (isLoggedIn) return <PermissionNavigator />;
  return <AuthNavigator />;
}
