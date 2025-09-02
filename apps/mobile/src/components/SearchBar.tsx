import React from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';

export function SearchBar({
  query,
  setQuery,
  onSubmit,
  onFocus,
  onBlur,
}: {
  query: string;
  setQuery: (v: string) => void;
  onSubmit: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
}) {
  // 안전 디코딩 (사용자가 % 입력 중일 때 decodeURIComponent 에러 방지)
  const safeDecode = (v: string) => {
    try {
      return decodeURIComponent(v);
    } catch {
      return v;
    }
  };

  return (
    <View className="search-bar flex flex-row justify-between w-5/6 h-14 px-4 py-2 mb-4 rounded-full bg-dark/15">
      <TextInput
        value={safeDecode(query)}
        onChangeText={setQuery}
        onFocus={onFocus}
        onBlur={onBlur}
        onSubmitEditing={onSubmit}
        placeholder="약속 장소를 검색하세요"
        inputMode="search"
        returnKeyType="search"
        autoCapitalize="none"
        className="h-full w-4/5 text-gray-800"
      />
      <TouchableOpacity className="w-6 h-full" onPressOut={onSubmit}>
        <Image
          source={require('@assets/images/magnifyIcon.png')}
          className="w-6 h-full"
          resizeMode="contain"
        />
      </TouchableOpacity>
    </View>
  );
}
