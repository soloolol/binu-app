import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BottomSheetView} from '@gorhom/bottom-sheet';
import {WebView} from 'react-native-webview';
import {SearchBar} from '@/components/SearchBar';
import Filter from '@/components/Filter';

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

export function MainBottomSheetContent({
  query,
  tags,
  placeId,
  webviewRef,
  webviewScrollEnabled,
  onMessage,
  setWebviewReady,
  updateParams,
  accessToken,
  navigation,
}: {
  query: string;
  tags: string[];
  placeId: string;
  webviewRef: any;
  webviewScrollEnabled: boolean;
  onMessage: (event: any) => void;
  setWebviewReady: (v: boolean) => void;
  updateParams: (params: any) => void;
  accessToken: string;
  navigation: any;
}) {
  return (
    <BottomSheetView style={styles.bottomSheetView}>
      <View className="flex flex-col w-full h-full items-center">
        {!placeId && (
          <View className="flex flex-col w-full items-center">
            <SearchBar
              query={query}
              setQuery={(v: string) => updateParams({query: v})}
              onSubmit={() => updateParams({query})}
              onFocus={() => navigation?.getParent?.() && undefined}
              onBlur={() => undefined}
            />
            <Filter navigation={navigation} initTags={tags} />
          </View>
        )}

        <View className="h-full w-full">
          <WebView
            ref={webviewRef}
            source={
              placeId
                ? {uri: `http://localhost:3000/place/${placeId}`}
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
            onMessage={onMessage}
            onLoadEnd={() => setWebviewReady(true)}
            onError={e => {
              console.warn('웹뷰 오류:', e.nativeEvent);
            }}
          />
        </View>
      </View>
    </BottomSheetView>
  );
}
