import React, {useRef, useMemo, useCallback, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {WebView} from 'react-native-webview';
import {BottomSheetDefaultBackdropProps} from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types';
import Map from '@/components/Map';

export default function MainScreen() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<object>([]);
  const [onFocus, setOnFocus] = useState<boolean>(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['5%', '30%', '50%', '90%'], []);

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
        <View className="flex-1">
          <Map />
          {/* 하단 BottomSheet + WebView */}
          <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            backdropComponent={renderBackdrop}
            backgroundStyle={styles.bottomSheetBackgroundStyle}>
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
                    source={{uri: 'http://localhost:3000'}}
                    className="h-full w-full"
                    onMessage={event => {
                      console.log(
                        '웹에서 메시지 받음: ' + event.nativeEvent.data,
                      );
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
});
