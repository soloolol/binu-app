import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {RefreshCwIcon} from 'lucide-react-native';

export function SearchAgainButton({
  style,
  onPress,
}: {
  style: any;
  onPress: () => void;
}) {
  return (
    <Animated.View
      pointerEvents="box-none"
      className="absolute w-full flex items-center"
      style={style}>
      <TouchableOpacity
        onPress={onPress}
        className="flex flex-row gap-2 rounded-full bg-slate-50 border-2 border-primary py-2 px-3">
        <RefreshCwIcon size={15} color="#4FD6B2" strokeWidth={1.5} />
        <Text>이 위치 재검색</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}
