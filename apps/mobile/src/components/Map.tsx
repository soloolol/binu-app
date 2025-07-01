import React, {useRef} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainNavigator';

type NavigationProp = NativeStackNavigationProp<MainStackParamList, 'Main'>;

export default function Map() {
  const navigation = useNavigation<NavigationProp>();
  const mapRef = useRef<MapView>(null);
  const initialRegion = {
    latitude: 37.5665,
    longitude: 126.978,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <>
      <MapView
        ref={mapRef}
        style={{flex: 1}}
        // provider={PROVIDER_GOOGLE}
        showsUserLocation
        region={initialRegion}>
        <Marker coordinate={initialRegion} title="현재 위치" />
      </MapView>

      {/* My 버튼 */}
      <TouchableOpacity
        className="absolute top-16 right-4"
        onPress={() => navigation.navigate('MyPage')}>
        <View className="flex flex-col items-center">
          <Image
            source={{uri: 'http://localhost:3000/images/orange.png'}} // 실제 이미지 URL
            className="rounded-full w-10 h-10 object-cover"
          />
          <Text>My</Text>
        </View>
      </TouchableOpacity>
    </>
  );
}
