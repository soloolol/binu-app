import {createNativeStackNavigator} from '@react-navigation/native-stack';

import PermissionScreen from '../screens/PermissionScreen';

export type PermissionParamList = {
  Permission: undefined;
};

const Stack = createNativeStackNavigator<PermissionParamList>();

export default function PermissionNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Permission" component={PermissionScreen} />
    </Stack.Navigator>
  );
}
