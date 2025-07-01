import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeft} from 'lucide-react-native';

interface NavigationHeaderProps {
  title?: string;
}

export default function NavigationHeader({title}: NavigationHeaderProps) {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row justify-between items-center p-3 bg-white">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <ChevronLeft size={28} color="#4B5563" />
      </TouchableOpacity>

      {title ? (
        <Text className="text-xl font-bold text-zinc-900">{title}</Text>
      ) : (
        <View />
      )}

      {/* 오른쪽 공간 확보용 placeholder */}
      <View style={{width: 28}} />
    </View>
  );
}
