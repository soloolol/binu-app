import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from '@/screens/MainScreen';
import MyPageScreen from '@/screens/MyPageScreen';
import EditProfileScreen from '@/screens/EditProfileScreen';

export type MainStackParamList = {
  Main: undefined;
  MyPage: undefined;
  EditProfile: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="Main">
      <Stack.Screen name="Main" component={MainScreen} />
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
