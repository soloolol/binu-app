import {Coord, Region} from '@/types/map';

/**
 * coord 값을 region 형식으로 바꿔주는 함수
 * @param c 지도의 중심이 될 좌표
 * @param delta 지도에 나타낼 지역의 좌표 범위 값
 * @returns
 */
export const convertToRegion = (c: Coord, delta: number): Region => {
  return {
    latitude: c.latitude - delta / 2,
    longitude: c.longitude - delta / 2,
    latitudeDelta: delta,
    longitudeDelta: delta,
  };
};
