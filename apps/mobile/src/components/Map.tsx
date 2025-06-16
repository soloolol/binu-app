import React, {useRef} from 'react';
import {TouchableOpacity} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

export default function Map() {
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
        className="absolute top-12 right-5 bg-white p-3 rounded-full shadow"
        onPress={() => {
          mapRef.current?.animateToRegion(initialRegion, 500);
        }}></TouchableOpacity>
    </>
  );
}
