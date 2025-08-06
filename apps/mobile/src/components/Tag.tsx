import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

interface TagProps {
  label?: string;
  isHighlight?: boolean;
  onPress?: () => void;
}

export default function Tag({label, isHighlight, onPress}: TagProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex justify-center
        px-4 py-1.5 rounded-full mr-1
        ${isHighlight ? 'bg-primary/40' : 'bg-dark/5'}
      `}>
      <Text className="font-source text-dark/90 font-semibold text-[10pt]">
        {label}
      </Text>
    </TouchableOpacity>
  );
}
