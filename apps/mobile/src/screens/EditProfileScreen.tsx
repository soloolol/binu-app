import {View, Alert} from 'react-native';

import NavigationHeader from '@/components/NavigationHeader';
import ScreenLayout from '@/components/ScreenLayout';
import WebView from 'react-native-webview';
import {useAuthStore} from '@/stores/useAuthStore';
import ImagePicker, {Image} from 'react-native-image-crop-picker';
import {useRef} from 'react';

export default function EditProfileScreen() {
  const logout = useAuthStore(state => state.logout);
  const webviewRef = useRef<WebView>(null);
  return (
    <ScreenLayout>
      <NavigationHeader title="프로필 편집" />
      <View className="h-full w-full ">
        <WebView
          ref={webviewRef}
          source={{
            uri: `http://localhost:3000/editProfile`,
          }}
          className="h-full w-full"
          keyboardDisplayRequiresUserAction={false}
          scrollEnabled={false}
          onMessage={async event => {
            const message = event.nativeEvent.data;
            if (message === 'OPEN_IMAGE_PICKER') {
              try {
                const image = await ImagePicker.openPicker({
                  mediaType: 'photo',
                  width: 120,
                  height: 120,
                  cropping: true,
                  includeBase64: true,
                  compressImageQuality: 0.8,
                });

                const base64 = image.data; // base64 string

                webviewRef.current?.injectJavaScript(`
                  window.dispatchEvent(new MessageEvent('message', {
                    data: ${JSON.stringify({
                      type: 'SELECTED_IMAGE',
                      base64,
                    })}
                  }));
                `);
              } catch (err) {
                console.warn('Image pick cancelled or failed', err);
              }
            } else if (message === 'AUTH_REQUIRED') {
              Alert.alert('세션이 만료되어 로그인이 필요합니다.');
              logout();
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
