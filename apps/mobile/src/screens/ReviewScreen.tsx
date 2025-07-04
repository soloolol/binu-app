import {View, Alert} from 'react-native';

import NavigationHeader from '@/components/NavigationHeader';
import ScreenLayout from '@/components/ScreenLayout';
import WebView from 'react-native-webview';
import {useAuthStore} from '@/stores/useAuthStore';
import {useRef} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '@/navigation/MainNavigator';

type ReviewScreenRouteProp = RouteProp<MainStackParamList, 'Review'>;

export default function ReviewScreen() {
  const route = useRoute<ReviewScreenRouteProp>();
  const {id} = route.params;
  const logout = useAuthStore(state => state.logout);
  const webviewRef = useRef<WebView>(null);
  return (
    <ScreenLayout>
      <NavigationHeader x={true} />
      <View className="h-full w-full ">
        <WebView
          ref={webviewRef}
          source={{
            uri: `http://localhost:3000/review/${id}`,
          }}
          className="h-full w-full"
          keyboardDisplayRequiresUserAction={false}
          onMessage={event => {
            try {
              const data = JSON.parse(event.nativeEvent.data);
              if (data.type === 'AUTH_REQUIRED') {
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
