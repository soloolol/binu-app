import React, {useRef} from 'react';
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
    </>
  );
}
