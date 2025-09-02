import {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainNavigator';

export function useMainBottomSheetState(
  navigation: NativeStackNavigationProp<MainStackParamList>,
  placeId: string,
  setWebviewScrollEnabled: (v: boolean) => void,
) {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const bottomSheetPosition = useSharedValue(1);

  const [showSearchButton, setShowSearchButton] = useState(true);
  const [showNavigation, setShowNavigation] = useState(true);

  const animatedButtonStyle = useAnimatedStyle(() => ({
    top: bottomSheetPosition.value - 40,
  }));

  const screenHeight = Dimensions.get('window').height;
  const snapPoint90Px = screenHeight * 0.1; // 90% snap means 10% visible from top

  const handleShowNavigation = (v: boolean) => {
    navigation.setOptions({headerShown: v});
    setShowNavigation(v);
  };

  useAnimatedReaction(
    () => bottomSheetPosition.value,
    position => {
      if (position <= snapPoint90Px + 10) {
        runOnJS(setWebviewScrollEnabled)(true);
        if (placeId && showNavigation) runOnJS(handleShowNavigation)(false);
      } else {
        runOnJS(setWebviewScrollEnabled)(false);
        if (placeId && !showNavigation) runOnJS(handleShowNavigation)(true);
      }
    },
    [showNavigation, placeId],
  );

  const onAnimate = (_fromIndex: number, toIndex: number) => {
    setShowSearchButton(toIndex < 2);
  };

  const snapToIndex = (index: number) =>
    bottomSheetRef.current?.snapToIndex(index);

  return {
    bottomSheetRef,
    bottomSheetPosition,
    animatedButtonStyle,
    showSearchButton,
    onAnimate,
    snapToIndex,
  } as const;
}
