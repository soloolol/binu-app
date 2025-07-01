import React, {useRef, useMemo, useCallback, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  TouchableOpacity,
  Text,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Map from '@/components/Map';
import {useAuthStore} from '@/stores/useAuthStore';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {RefreshCwIcon} from 'lucide-react-native';

export default function MainScreen() {
  const logout = useAuthStore(state => state.logout);
  const [query, setQuery] = useState<string>('');
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const [showSearchButton, setShowSearchButton] = useState(true);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['5%', '30%', '50%', '90%'], []);
  const coord = '127.12345;37.12345';
  const accessToken = 'testAccesssToken';
  const bottomSheetPosition = useSharedValue(1); // BottomSheet 위치
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      top: bottomSheetPosition.value - 40, // 버튼 높이만큼 보정
    };
  });

  useEffect(() => {
    if (onFocus) {
      bottomSheetRef.current?.snapToIndex(2);
    }
  }, [onFocus]);

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="collapse"
        appearsOnIndex={3}
        disappearsOnIndex={1}
      />
    ),
    [],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Map />
          {/* 재검색 버튼 */}
          {showSearchButton && (
            <Animated.View
              pointerEvents="box-none"
              className={`absolute w-full flex items-center`}
              style={[animatedButtonStyle]}>
              <TouchableOpacity
                onPress={() => console.log('재검색')}
                className="flex flex-row gap-2 rounded-full bg-slate-50 border-2 border-primary py-2 px-3">
                <RefreshCwIcon size={15} color="#4FD6B2" strokeWidth={1.5} />
                <Text>이 위치 재검색</Text>
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* 하단 BottomSheet + WebView */}
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.bottomSheetBackgroundStyle}
            onAnimate={(fromIndex, toIndex) => {
              setShowSearchButton(toIndex < 2);
            }}
            animatedPosition={bottomSheetPosition}>
            <BottomSheetView style={styles.bottomSheetView}>
              <View className="flex flex-col w-full h-full items-center bg-[#]">
                <View className="search-bar flex flex-row justify-between w-5/6 h-14 px-4 py-2 mb-4 rounded-full bg-dark/15">
                  <TextInput
                    value={query}
                    onChangeText={setQuery}
                    onFocus={() => setOnFocus(true)}
                    onBlur={() => setOnFocus(false)}
                    placeholder="약속 장소를 검색하세요"
                    inputMode="search"
                    autoCapitalize="none"
                    className="h-full w-4/5 text-gray-800"
                  />
                  <Image
                    source={require('@assets/images/magnifyIcon.png')}
                    className="w-6 h-full"
                    resizeMode="contain"
                  />
                </View>
                <View className="h-full w-full ">
                  <WebView
                    source={{
                      uri: `http://localhost:3000/search?coord=
                      ${coord}`,
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Binu-User-Id': 'soloolol222@gmail.com',
                      },
                    }}
                    className="h-full w-full"
                    onMessage={event => {
                      if (event.nativeEvent.data === 'AUTH_REQUIRED') {
                        // 앱에서 WebView 닫기, 재로그인 유도 등
                        Alert.alert('세션이 만료되어 로그인이 필요합니다.');
                        logout();
                      }
                    }}
                    onLoadStart={() => console.log('로딩 시작')}
                    onLoadEnd={() => console.log('로딩 완료')}
                    onError={syntheticEvent => {
                      const {nativeEvent} = syntheticEvent;
                      console.warn('웹뷰 오류:', nativeEvent);
                    }}></WebView>
                </View>
              </View>
            </BottomSheetView>
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  bottomSheetBackgroundStyle: {
    backgroundColor: '#F4F7F6',
    borderColor: '#a1f4de',
    borderWidth: 0.5,
  },
  bottomSheetView: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    backgroundColor: '#F4F7F6',
  },
  searchAgainButton: {
    position: 'absolute',
    right: 16,
    zIndex: 10,
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
});
