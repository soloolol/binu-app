import React, {useEffect, useState} from 'react';
import {View, ScrollView} from 'react-native';
import {useTagStore} from '@/stores/tagStore';
import Tag from '@/components/Tag';
import {TagInfoWithIsChecked} from '@/types/Tag';
import {SlidersHorizontal} from 'lucide-react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainNavigator';
import DropDownPicker from 'react-native-dropdown-picker';

interface FilterProps {
  navigation: NativeStackNavigationProp<MainStackParamList>;
  initTags: string[];
}
export default function Filter({navigation, initTags}: FilterProps) {
  const TAG_DEFINITION = useTagStore(state => state.tagDefinitions);

  const [tagFilters, setTagFilters] = useState<TagInfoWithIsChecked[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('score');
  const [items, setItems] = useState([
    {label: '별점순', value: 'score'},
    {label: '거리순', value: 'distance'},
  ]);

  useEffect(() => {
    if (!TAG_DEFINITION) return;
    const filters: TagInfoWithIsChecked[] = Object.entries(TAG_DEFINITION).map(
      ([_, value]) => ({
        ...value,
        isChecked: initTags?.includes(value.tagKey),
      }),
    );
    setTagFilters(filters);
  }, [TAG_DEFINITION, initTags]);

  const toggleTag = (selectedTagList: string[], key: string) => {
    console.log('preSelectedList:', selectedTagList);
    let newTags = selectedTagList.includes(key)
      ? selectedTagList.filter(t => t !== key)
      : [...selectedTagList, key];
    console.log('newTags:', newTags);
    navigation.setParams({tags: newTags});
  };

  return (
    <View className="flex-row items-center w-full gap-x-2 px-4 pt-1 pb-3">
      <View className="flex-row items-center gap-x-2 mr-2">
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          showArrowIcon={false}
          showTickIcon={false}
          style={{
            borderRadius: 24,
            borderColor: '#ccc',
            width: 70,
            height: 35,
            minHeight: 35,
            paddingHorizontal: 8,
            paddingVertical: 0,
          }}
          textStyle={{
            fontSize: 13,
            color: '#1f2937',
            fontWeight: '600',
            textAlign: 'center',
          }}
          dropDownContainerStyle={{
            borderRadius: 24,
            borderColor: '#ccc',
            paddingVertical: 0,
            zIndex: 1000000,
          }}
          containerStyle={{
            width: 70,
            paddingVertical: 0,
          }}
          listItemContainerStyle={{
            height: 30, // 👈 셀 높이
            justifyContent: 'center',
          }}
          zIndex={100000000}
          maxHeight={150}
          dropDownDirection={'BOTTOM'}
        />
        <SlidersHorizontal
          className="text-gray-700"
          size={20}
          strokeWidth={1.5}
        />
      </View>

      {/* 오른쪽: 태그 리스트 */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        contentContainerStyle={{gap: 8}}>
        {tagFilters
          .sort((a, b) => a.index - b.index)
          .map(tag => (
            <Tag
              key={tag.index}
              label={tag.label}
              isHighlight={tag.isChecked}
              onPress={() => toggleTag(initTags, tag.tagKey)}
            />
          ))}
      </ScrollView>
    </View>
  );
}
