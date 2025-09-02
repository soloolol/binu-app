import {useRef, useState, useEffect} from 'react';
import {WebView} from 'react-native-webview';
import {Alert} from 'react-native';
import {useAuthStore} from '@/stores/useAuthStore';

export function useWebViewHandler(navigation: any) {
  const logout = useAuthStore(state => state.logout);
  const webviewRef = useRef<WebView>(null);
  const [webviewReady, setWebviewReady] = useState(false);

  const handleWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'GO_REVIEW' && data.id) {
        navigation.push('Review', {id: data.id});
      } else if (data.type === 'GO_PLACE' && data.id) {
        navigation.push('Main', {placeId: data.id});
      } else if (data.type === 'AUTH_REQUIRED') {
        Alert.alert('세션이 만료되어 로그인이 필요합니다.');
        logout();
      }
    } catch (err) {
      console.warn('메시지 파싱 실패', err);
    }
  };

  return {webviewRef, webviewReady, setWebviewReady, handleWebViewMessage};
}
