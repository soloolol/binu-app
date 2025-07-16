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
  Dimensions,
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
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {RefreshCwIcon} from 'lucide-react-native';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {MainStackParamList} from '@/navigation/MainNavigator';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import MyPageButton from '@/components/MyPageButton';

type ReviewScreenRouteProp = RouteProp<MainStackParamList, 'Main'>;

export default function MainScreen() {
  const route = useRoute<ReviewScreenRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const logout = useAuthStore(state => state.logout);

  const [webviewScrollEnabled, setWebviewScrollEnabled] =
    useState<boolean>(false);
  const [showSearchButton, setShowSearchButton] = useState<boolean>(true);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);
  const [placeId, setPlaceId] = useState<string>(route.params?.id || '');
  const [query, setQuery] = useState<string>('');

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['5%', '30%', '50%', '90%'], []);
  const coord = '127.12345;37.12345';
  const accessToken = 'testAccesssToken';
  const bottomSheetPosition = useSharedValue(1);
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      top: bottomSheetPosition.value - 40, // 버튼 높이만큼 보정
    };
  });

  useEffect(() => {
    if (isSearchFocused) {
      bottomSheetRef.current?.snapToIndex(2);
    }
  }, [isSearchFocused]);

  useEffect(() => {
    console.log('render~~');
  });

  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps,
    ) => (
      <BottomSheetBackdrop
        {...props}
        pressBehavior="collapse"
        appearsOnIndex={3}
        disappearsOnIndex={2}
      />
    ),
    [],
  );

  const [showNavigation, setShowNavigation] = useState<boolean>(true);
  const handleShowNavigation = (v: boolean) => {
    navigation.setOptions({headerShown: v});
    setShowNavigation(v);
  };
  // bottomSeetPosition 최상단일때 웹뷰 스크롤 허용
  const screenHeight = Dimensions.get('window').height;
  // snapPoint인 90%를 px로 변환
  const snapPoint90 = screenHeight * 0.1;
  useAnimatedReaction(
    () => bottomSheetPosition.value,
    position => {
      if (position <= snapPoint90 + 10) {
        runOnJS(setWebviewScrollEnabled)(true);
        if (placeId && showNavigation) runOnJS(handleShowNavigation)(false);
      } else {
        runOnJS(setWebviewScrollEnabled)(false);
        if (placeId && !showNavigation) runOnJS(handleShowNavigation)(true);
      }
    },
    [showNavigation, placeId],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Map />
          {/* My 버튼 */}
          {placeId ? null : <MyPageButton />}
          {/* 재검색 버튼 */}
          {!placeId && showSearchButton && (
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
            enableContentPanningGesture={true}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.bottomSheetBackgroundStyle}
            onAnimate={(fromIndex, toIndex) => {
              setShowSearchButton(toIndex < 2);
            }}
            animatedPosition={bottomSheetPosition}>
            <BottomSheetView style={styles.bottomSheetView}>
              <View className="flex flex-col w-full h-full  items-center">
                {placeId ? null : (
                  <View className="search-bar flex flex-row justify-between w-5/6 h-14 px-4 py-2 mb-4 rounded-full bg-dark/15">
                    <TextInput
                      value={query}
                      onChangeText={setQuery}
                      onFocus={() => setIsSearchFocused(true)}
                      onBlur={() => setIsSearchFocused(false)}
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
                )}

                <View className="h-full w-full">
                  <WebView
                    source={
                      placeId
                        ? {
                            uri: `http://localhost:3000/place/${placeId}`,
                          }
                        : {
                            uri: `http://localhost:3000/search?coord=
                      ${coord}`,
                            headers: {
                              Authorization: `Bearer ${accessToken}`,
                              'Binu-User-Id': 'soloolol222@gmail.com',
                            },
                          }
                    }
                    className="h-full w-full"
                    keyboardDisplayRequiresUserAction={false}
                    scrollEnabled={webviewScrollEnabled}
                    showsHorizontalScrollIndicator={false}
                    onMessage={event => {
                      try {
                        const data = JSON.parse(event.nativeEvent.data);
                        if (data.type === 'GO_REVIEW' && data.id) {
                          console.log('받은 ID:', data.id);
                          navigation.navigate('Review', {id: data.id});
                        } else if (data.type === 'GO_PLACE' && data.id) {
                          console.log('받은 ID:', data.id);
                          navigation.push('Main', {id: data.id});
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
