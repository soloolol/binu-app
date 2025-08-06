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
import Map, {MapRef} from '@/components/Map';
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
import {fetchPlaces, Place, SearchParams} from '@/lib/fetchPlaces';
import {getMyCoord} from '@/utils/getMyCoord';
import {convertToRegion} from '@/utils/convertToRegion';
import {Coord} from '@/types/map';
import Filter from '@/components/Filter';
import {alertToOpenSettings} from '@/utils/alertToOpenSettings';

type MainScreenRouteProp = RouteProp<MainStackParamList, 'Main'>;

export default function MainScreen() {
  const route = useRoute<MainScreenRouteProp>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();
  const logout = useAuthStore(state => state.logout);

  const accessToken = 'testAccesssToken';

  const webviewRef = useRef<WebView>(null);
  const [webviewScrollEnabled, setWebviewScrollEnabled] =
    useState<boolean>(false);
  const [showSearchButton, setShowSearchButton] = useState<boolean>(true);
  const [isSearchFocused, setIsSearchFocused] = useState<boolean>(false);

  const [coord, setCoord] = useState<Coord>();
  const [query, setQuery] = useState<string>(route.params.query || '');
  const [sort, setSort] = useState<string>(route.params.sort || 'score');
  const [tags, setTags] = useState<string[]>(route.params.tags || []);
  const [placeId, setPlaceId] = useState<string>(route.params.placeId || '');
  const [places, setPlaces] = useState<Place[]>([]);
  const [webviewReady, setWebviewReady] = useState(false);
  const DELTA = 0.01;

  const mapRef = useRef<MapRef>(null);

  const searchPlaces = ({placeId, coord, query, sort, tags}: SearchParams) => {
    // TODO :: 검색값들 검증
    console.log(
      `placeId:${placeId}, coord:${coord?.latitude},${
        coord?.longitude
      }, query:${
        query && decodeURIComponent(query)
      }, sort:${sort}, tags:${tags}`,
    );
    if (!coord) return;
    // TODO :: tanstack query로 변경하기
    const region = convertToRegion(coord, DELTA);
    const data = fetchPlaces({region, placeId, query, sort, tags});
    setPlaces(data);
    console.log('places result:', data);
  };

  const handleRefreshInCurrentMap = async (c: Promise<Coord> | undefined) => {
    const coord = await c;
    navigation.navigate('Main', {
      ...route.params,
      lat: coord?.latitude,
      lng: coord?.longitude,
    });
  };

  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['5%', '30%', '50%', '90%'], []);
  const bottomSheetPosition = useSharedValue(1);
  const animatedButtonStyle = useAnimatedStyle(() => {
    return {
      top: bottomSheetPosition.value - 40, // 버튼 높이만큼 보정
    };
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

  useEffect(() => {
    console.log('route:', route.params);
    try {
      (async () => {
        let myCoord = await getMyCoord();
        let newCoord =
          route.params.lat && route.params.lng
            ? {latitude: route.params.lat, longitude: route.params.lng}
            : myCoord;
        let newQuery = route.params.query || '';
        let newPlaceId = route.params.placeId || '';
        let newSort = route.params.sort || 'score';
        let newTags = route.params.tags || [];
        setCoord(newCoord);
        setQuery(newQuery);
        setPlaceId(newPlaceId);
        setSort(newSort);
        setTags(newTags);
        searchPlaces({
          placeId: newPlaceId,
          coord: newCoord,
          query: newQuery,
          sort: newSort,
          tags: newTags,
        });
      })();
    } catch (error) {
      alertToOpenSettings(
        '위치 권한이 필요합니다',
        '이 기능을 사용하려면 위치 접근 권한을 허용해주세요.',
      );
      console.error('위치 정보를 가져오는 데 실패했습니다:', error);
    }
  }, [route.params]);

  useEffect(() => {
    if (webviewReady && places.length > 0) {
      console.log('▶ postMessage initial places:', places);
      webviewRef.current?.postMessage(
        JSON.stringify({type: 'SET_PLACES', data: places}),
      );
    }
  }, [webviewReady, places]);

  useEffect(() => {
    if (isSearchFocused) {
      bottomSheetRef.current?.snapToIndex(2);
    }
  }, [isSearchFocused]);

  useEffect(() => {
    console.log('render~~');
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Map
            ref={mapRef}
            coord={coord}
            focusedPlaceId={placeId}
            places={places}
            DELTA={DELTA}
            handleFocusedPlace={(placeId: string, center: Coord) => {
              if (route.params?.placeId) {
                setPlaceId(placeId);
              } else {
                navigation.push('Main', {
                  placeId: placeId,
                  lat: center.latitude,
                  lng: center.longitude,
                });
              }
            }}
          />
          {/* My 버튼 */}
          {placeId ? null : <MyPageButton />}
          {/* 재검색 버튼 */}
          {!placeId && showSearchButton && (
            <Animated.View
              pointerEvents="box-none"
              className={`absolute w-full flex items-center`}
              style={[animatedButtonStyle]}>
              <TouchableOpacity
                onPress={() =>
                  handleRefreshInCurrentMap(
                    mapRef.current?.getScreenCenterCoords(),
                  )
                }
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
              <View className="flex flex-col w-full h-full items-center">
                {placeId ? null : (
                  <View className="flex flex-col w-full items-center">
                    <View className="search-bar flex flex-row justify-between w-5/6 h-14 px-4 py-2 mb-4 rounded-full bg-dark/15">
                      <TextInput
                        value={decodeURIComponent(query)}
                        onChangeText={setQuery}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                        onSubmitEditing={() => {
                          navigation.navigate('Main', {
                            ...route.params,
                            query: encodeURIComponent(query),
                          });
                        }}
                        placeholder="약속 장소를 검색하세요"
                        inputMode="search"
                        returnKeyType="search"
                        autoCapitalize="none"
                        className="h-full w-4/5 text-gray-800"
                      />
                      <TouchableOpacity
                        className="w-6 h-full"
                        onPressOut={() => {
                          navigation.navigate('Main', {
                            ...route.params,
                            query: encodeURIComponent(query),
                          });
                        }}>
                        <Image
                          source={require('@assets/images/magnifyIcon.png')}
                          className="w-6 h-full"
                          resizeMode="contain"
                        />
                      </TouchableOpacity>
                    </View>
                    <Filter navigation={navigation} initTags={tags} />
                  </View>
                )}

                <View className="h-full w-full">
                  <WebView
                    ref={webviewRef}
                    source={
                      placeId
                        ? {
                            uri: `http://localhost:3000/place/${placeId}`,
                          }
                        : {
                            uri: `http://localhost:3000/search`,
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
                          navigation.push('Main', {
                            ...route.params,
                            placeId: data.id,
                          });
                        } else if (data.type === 'AUTH_REQUIRED') {
                          Alert.alert('세션이 만료되어 로그인이 필요합니다.');
                          logout();
                        }
                      } catch (err) {
                        console.warn('메시지 파싱 실패', err);
                      }
                    }}
                    onLoadEnd={() => {
                      console.log('WebView loaded');
                      setWebviewReady(true);
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
