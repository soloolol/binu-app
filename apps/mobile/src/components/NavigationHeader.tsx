import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ChevronLeft, X} from 'lucide-react-native';

interface NavigationHeaderProps {
  title?: string;
  x?: boolean;
}

export default function NavigationHeader({
  title,
  x = false,
}: NavigationHeaderProps) {
  const navigation = useNavigation();

  return (
    <View className="w-full flex-row justify-between items-center p-3 bg-white">
      {x ? (
        <View style={{width: 28}} />
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeft size={28} color="#4B5563" />
        </TouchableOpacity>
      )}

      {title ? (
        <Text className="text-xl font-bold text-zinc-900">{title}</Text>
      ) : (
        <View />
      )}
      {x ? (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <X size={28} color="#4B5563" />
        </TouchableOpacity>
      ) : (
        <View style={{width: 28}} />
      )}
    </View>
  );
}
