import {useEffect, useState} from 'react';
import {RouteProp, useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MainStackParamList} from '@/navigation/MainNavigator';
import {fetchPlaces, Place, SearchParams} from '@/lib/fetchPlaces';
import {getMyCoord} from '@/utils/getMyCoord';
import {convertToRegion} from '@/utils/convertToRegion';
import {Coord} from '@/types/map';
import {alertToOpenSettings} from '@/utils/alertToOpenSettings';
import {MAP_DELTA} from '@/constants/map';

export type MainScreenRouteProp = RouteProp<MainStackParamList, 'Main'>;

export function useSearchPlaces(route: MainScreenRouteProp) {
  const navigation =
    useNavigation<NativeStackNavigationProp<MainStackParamList>>();

  const [coord, setCoord] = useState<Coord | undefined>(undefined);
  const [query, setQuery] = useState<string>(route.params.query || '');
  const [sort, setSort] = useState<string>(route.params.sort || 'score');
  const [tags, setTags] = useState<string[]>(route.params.tags || []);
  const [placeId, setPlaceId] = useState<string>(route.params.placeId || '');
  const [places, setPlaces] = useState<Place[]>([]);

  const searchPlaces = ({placeId, coord, query, sort, tags}: SearchParams) => {
    if (!coord) return;
    const region = convertToRegion(coord, MAP_DELTA);
    const data = fetchPlaces({region, placeId, query, sort, tags});
    setPlaces(data);
  };

  const updateParams = (
    params: Partial<SearchParams> & {lat?: number; lng?: number},
  ) => {
    navigation.navigate('Main', {
      ...route.params,
      ...params,
      // ensure query encoding for route params
      query:
        params.query !== undefined
          ? encodeURIComponent(params.query)
          : route.params.query,
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const myCoord = await getMyCoord();
        const newCoord =
          route.params.lat && route.params.lng
            ? {latitude: route.params.lat, longitude: route.params.lng}
            : myCoord;

        const newQuery = route.params.query || '';
        const newPlaceId = route.params.placeId || '';
        const newSort = route.params.sort || 'score';
        const newTags = route.params.tags || [];

        setCoord(newCoord);
        setQuery(newQuery);
        setPlaceId(newPlaceId);
        setSort(newSort);
        setTags(newTags);

        searchPlaces({
          placeId: newPlaceId,
          coord: newCoord,
          query: newQuery,
          sort: newSort,
          tags: newTags,
        });
      } catch (error) {
        alertToOpenSettings(
          '위치 권한이 필요합니다',
          '이 기능을 사용하려면 위치 접근 권한을 허용해주세요.',
        );
      }
    })();
  }, [route.params]);

  return {
    coord,
    query,
    sort,
    tags,
    placeId,
    places,
    setQuery,
    setPlaceId,
    searchPlaces,
    updateParams,
  } as const;
}
