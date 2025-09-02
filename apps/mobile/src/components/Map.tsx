import {Place} from '@/lib/fetchPlaces';
import {Coord, Region} from '@/types/map';
import {convertToRegion} from '@/utils/convertToRegion';
import {
  NaverMapView,
  NaverMapViewRef,
  NaverMapMarkerOverlay,
} from '@mj-studio/react-native-naver-map';
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Dimensions} from 'react-native';

const initailRegion = {
  latitude: 37.5665,
  longitude: 126.978,
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export interface MapRef {
  getScreenCenterCoords: () => Promise<Coord>;
}

interface MapProps {
  coord: Coord | undefined;
  focusedPlaceId: string | undefined;
  places: Place[];
  DELTA: number;
  handleFocusedPlace: (placeId: string, coord: Coord) => void;
}

export default forwardRef<MapRef, MapProps>(
  ({coord, focusedPlaceId, places, DELTA, handleFocusedPlace}, ref) => {
    useImperativeHandle(ref, () => ({
      getScreenCenterCoords,
    }));

    const mapRef = useRef<NaverMapViewRef>(null);
    const [region, setRegion] = useState<Region>();
    const {width, height} = Dimensions.get('window');

    const getScreenCenterCoords = async (): Promise<Coord> => {
      const centerCoord = await mapRef.current?.screenToCoordinate({
        screenX: width / 2,
        screenY: height / 2,
      });
      console.log('center:', centerCoord);
      if (centerCoord?.isValid)
        return {
          latitude: centerCoord.latitude,
          longitude: centerCoord.longitude,
        };
      else throw new Error();
    };

    const handleMarkerClick = async (place: Place) => {
      const center = await getScreenCenterCoords();
      handleFocusedPlace(place.id, center);
    };

    useEffect(() => {
      if (coord) {
        setRegion(convertToRegion(coord, DELTA));
      }
    }, [coord]);

    return (
      <NaverMapView
        ref={mapRef}
        style={{flex: 1}}
        region={region}
        initialRegion={initailRegion}>
        {places?.map((place, i) => (
          <NaverMapMarkerOverlay
            key={place.id}
            latitude={place.lat}
            longitude={place.lng}
            caption={{
              text: place.name,
              color: '#1B2824',
              haloColor: 'white',
              requestedWidth: 5,
              minZoom: 14,
            }}
            image={require('@assets/images/marker_bright.png')}
            width={focusedPlaceId === place.id ? 35 : 25}
            height={focusedPlaceId === place.id ? 49 : 32}
            globalZIndex={focusedPlaceId === place.id ? 1001 : 1000}
            onTap={() => handleMarkerClick(place)}
          />
        ))}
      </NaverMapView>
    );
  },
);
