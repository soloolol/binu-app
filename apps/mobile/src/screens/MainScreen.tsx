import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import Animated from 'react-native-reanimated';

import Map, {MapRef} from '@/components/Map';
import MyPageButton from '@/components/MyPageButton';
import {SearchAgainButton} from '@/components/SearchAgainButton';
import {MainBottomSheetContent} from '@/components/MainBottomSheetContent';

import {MainStackParamList} from '@/navigation/MainNavigator';
import {useSearchPlaces} from '@/hooks/useSearchPlaces';
import {useMainWebViewBridge} from '@/hooks/useMainWebViewBridge';
import {useMainBottomSheetState} from '@/hooks/useMainBottomSheetState';
import {BOTTOM_SHEET_SNAP_POINTS} from '@/constants/map';
import {Coord} from '@/types/map';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';

const styles = StyleSheet.create({
  bottomSheetBackgroundStyle: {
    backgroundColor: '#F4F7F6',
    borderColor: '#a1f4de',
    borderWidth: 0.5,
  },
});

export default function MainScreen() {
  const route = useRoute<RouteProp<MainStackParamList, 'Main'>>();
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const accessToken = 'testAccesssToken';

  const {
    coord,
    query,
    tags,
    placeId,
    places,
    setQuery,
    setPlaceId,
    updateParams,
  } = useSearchPlaces(route);

  const {webviewRef, webviewReady, setWebviewReady, handleWebViewMessage} =
    useMainWebViewBridge(navigation, route);

  const [webviewScrollEnabled, setWebviewScrollEnabled] = useState(false);

  const {
    bottomSheetRef,
    bottomSheetPosition,
    animatedButtonStyle,
    showSearchButton,
    onAnimate,
    snapToIndex,
  } = useMainBottomSheetState(navigation, placeId, setWebviewScrollEnabled);

  const mapRef = useRef<MapRef>(null);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    if (webviewReady && places.length > 0) {
      webviewRef.current?.postMessage(
        JSON.stringify({type: 'SET_PLACES', data: places}),
      );
    }
  }, [webviewReady, places]);

  useEffect(() => {
    if (isSearchFocused) snapToIndex(2);
  }, [isSearchFocused]);

  const handleRefreshInCurrentMap = async (c: Promise<Coord> | undefined) => {
    const currentCoord = await c;
    navigation.navigate('Main', {
      ...(route.params as any),
      lat: currentCoord?.latitude,
      lng: currentCoord?.longitude,
    });
  };

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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <GestureHandlerRootView style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Map
            ref={mapRef}
            coord={coord}
            focusedPlaceId={placeId}
            places={places}
            DELTA={0.01}
            handleFocusedPlace={(newPlaceId: string, center: Coord) => {
              if ((route.params as any)?.placeId) {
                setPlaceId(newPlaceId);
              } else {
                navigation.push('Main', {
                  ...(route.params as any),
                  placeId: newPlaceId,
                  lat: center.latitude,
                  lng: center.longitude,
                });
              }
            }}
          />

          {!placeId ? <MyPageButton /> : null}

          {!placeId && showSearchButton && (
            <Animated.View
              pointerEvents="box-none"
              className="absolute w-full flex items-center"
              style={[animatedButtonStyle]}>
              <SearchAgainButton
                style={undefined}
                onPress={() =>
                  handleRefreshInCurrentMap(
                    mapRef.current?.getScreenCenterCoords(),
                  )
                }
              />
            </Animated.View>
          )}

          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={[...BOTTOM_SHEET_SNAP_POINTS]}
            enableContentPanningGesture={true}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.bottomSheetBackgroundStyle}
            onAnimate={onAnimate}
            animatedPosition={bottomSheetPosition}>
            <MainBottomSheetContent
              query={query}
              tags={tags}
              placeId={placeId}
              webviewRef={webviewRef}
              webviewScrollEnabled={webviewScrollEnabled}
              onMessage={handleWebViewMessage}
              setWebviewReady={setWebviewReady}
              updateParams={updateParams}
              accessToken={accessToken}
              navigation={navigation}
            />
          </BottomSheet>
        </View>
      </GestureHandlerRootView>
    </TouchableWithoutFeedback>
  );
}
