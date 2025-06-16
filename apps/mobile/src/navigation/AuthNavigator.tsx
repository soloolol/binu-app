import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LogInScreen from '../screens/LogInScreen';

export type AuthStackParamList = {
  LogIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="LogIn" component={LogInScreen} />
    </Stack.Navigator>
  );
}
