import {createNativeStackNavigator} from '@react-navigation/native-stack';

import MainScreen from '@/screens/MainScreen';
import MyPageScreen from '@/screens/MyPageScreen';
import EditProfileScreen from '@/screens/EditProfileScreen';
import ReviewScreen from '@/screens/ReviewScreen';
import {ChevronLeft, X} from 'lucide-react-native';
import {TouchableOpacity} from 'react-native';

export type MainStackParamList = {
  Main: {id?: string};
  MyPage: undefined;
  Review: {id: string};
  EditProfile: undefined;
  Place: {id: string};
};

const Stack = createNativeStackNavigator<MainStackParamList>();

export default function MainNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false, animation: 'none'}}
      initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={MainScreen}
        options={({route, navigation}) => ({
          headerShown: route.params?.id ? true : false,
          headerTransparent: true,
          headerTitle: '',
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              className="rounded-full bg-slate-50 p-2">
              <ChevronLeft color="black" size={24} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              onPress={() => navigation.popToTop()}
              className="rounded-full bg-slate-50 p-2">
              <X color="black" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="MyPage" component={MyPageScreen} />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        initialParams={{id: ''}}
      />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
