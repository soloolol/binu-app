import NavigationHeader from '@/components/NavigationHeader';
import ScreenLayout from '@/components/ScreenLayout';
import {MainStackParamList} from '@/navigation/MainNavigator';
import {useAuthStore} from '@/stores/useAuthStore';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Alert, View} from 'react-native';
import WebView from 'react-native-webview';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Main'>;

export default function MyPageScreen() {
  const logout = useAuthStore(state => state.logout);
  const navigation = useNavigation<NavigationProp>();

  return (
    <ScreenLayout>
      <NavigationHeader />
      <View className="h-full w-full ">
        <WebView
          source={{
            uri: `http://localhost:3000/myPage`,
          }}
          className="h-full w-full"
          onMessage={event => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.type === 'GO_EDIT_PROFILE') {
                navigation.push('EditProfile');
              } else if (data.type === 'GO_PLACE' && data.id) {
                console.log('받은 ID:', data.id);
                navigation.push('Main', {placeId: data.id});
              } else if (data.type === 'AUTH_REQUIRED') {
                Alert.alert('세션이 만료되어 로그인이 필요합니다.');
                logout();
              }
            } catch (err) {
              console.warn('메시지 파싱 실패', err);
            }
          }}
          onError={syntheticEvent => {
            const {nativeEvent} = syntheticEvent;
            console.warn('웹뷰 오류:', nativeEvent);
          }}></WebView>
      </View>
    </ScreenLayout>
  );
}
