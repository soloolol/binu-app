import {Coord, Region} from '@/types/map';

export const convertToRegion = (c: Coord, delta: number): Region => {
  return {
    latitude: c.latitude - delta / 2,
    longitude: c.longitude - delta / 2,
    latitudeDelta: delta,
    longitudeDelta: delta,
  };
};
