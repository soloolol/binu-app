import {Image, Text, TouchableOpacity, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainNavigator';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Main'>;

export default function MyPageButton() {
  const navigation = useNavigation<NavigationProp>();
  return (
    <TouchableOpacity
      className="absolute top-16 right-4"
      onPress={() => navigation.navigate('MyPage')}>
      <View className="flex flex-col items-center">
        <Image
          source={{uri: 'http://localhost:3000/images/orange.png'}} // 실제 이미지 URL 대체
          className="rounded-full w-10 h-10 object-cover"
        />
        <Text>My</Text>
      </View>
    </TouchableOpacity>
  );
}
