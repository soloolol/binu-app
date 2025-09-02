import {useRef, useState} from 'react';
import {Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import {useAuthStore} from '@/stores/useAuthStore';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainNavigator';
import type {RouteProp} from '@react-navigation/native';

export function useMainWebViewBridge(
  navigation: NativeStackNavigationProp<MainStackParamList>,
  route: RouteProp<MainStackParamList, 'Main'>,
) {
  const logout = useAuthStore(state => state.logout);
  const webviewRef = useRef<WebView>(null);
  const [webviewReady, setWebviewReady] = useState(false);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'GO_REVIEW' && data.id) {
        navigation.navigate('Review', {id: data.id});
      } else if (data.type === 'GO_PLACE' && data.id) {
        navigation.push('Main', {...route.params, placeId: data.id});
      } else if (data.type === 'AUTH_REQUIRED') {
        Alert.alert('세션이 만료되어 로그인이 필요합니다.');
        logout();
      }
    } catch (err) {
      console.warn('메시지 파싱 실패', err);
    }
  };

  return {
    webviewRef,
    webviewReady,
    setWebviewReady,
    handleWebViewMessage,
  } as const;
}
