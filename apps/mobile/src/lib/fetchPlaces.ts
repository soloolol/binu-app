import {Coord} from '@/types/map';
import type {Region} from '@mj-studio/react-native-naver-map';

export interface Place {
  id: string;
  name: string;
  lat: number;
  lng: number;
  subtitle: string;
  binuScore: number;
  starScore: number;
  tags: string[];
}

const items: Place[] = [
  {
    id: '123',
    name: '안가네등갈비',
    lat: 37.5384289,
    lng: 127.1408431,
    subtitle: '식당',
    binuScore: 4.8,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'genderSeparated', 'hasDiaperTable'],
  },
  {
    id: '124',
    name: '사랑방초밥집',
    lat: 37.5372862,
    lng: 127.1404694,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: '333',
    name: '길동골목냉면',
    lat: 37.5376406,
    lng: 127.1414939,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: '126',
    name: '주점은붕어',
    lat: 37.53762,
    lng: 127.1406041,
    subtitle: '주점',
    binuScore: 4.8,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G001',
    name: '도원한우',
    lat: 37.529,
    lng: 127.123,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G002',
    name: '황도바지락칼국수',
    lat: 37.538,
    lng: 127.125,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G003',
    name: '수라연',
    lat: 37.541,
    lng: 127.136,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G004',
    name: '강동반상',
    lat: 37.537,
    lng: 127.139,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G005',
    name: '백제추어탕',
    lat: 37.548,
    lng: 127.141,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G006',
    name: '서초면옥 천호본점',
    lat: 37.54,
    lng: 127.144,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G007',
    name: '마드레',
    lat: 37.536,
    lng: 127.134,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G008',
    name: '오늘손칼국수&찜 강동본점',
    lat: 37.542,
    lng: 127.13,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G009',
    name: '푸주옥',
    lat: 37.539,
    lng: 127.126,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },

  {
    id: 'G010',
    name: '샘밭막국수 올림픽공원점',
    lat: 37.523,
    lng: 127.123,
    subtitle: '주점',
    binuScore: 4.5,
    starScore: 4.7,
    tags: [
      'hasSoap',
      'hasToiletPaper',
      'genderSeparated',
      'hasBidet',
      'hasWarmWater',
    ],
  },
  {
    id: 'G011',
    name: '최냉면본점',
    lat: 37.536,
    lng: 127.142,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G012',
    name: '고모네 원조콩탕황태탕',
    lat: 37.532,
    lng: 127.127,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G013',
    name: '송월냉면',
    lat: 37.534,
    lng: 127.133,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G014',
    name: '화진포막국수',
    lat: 37.537,
    lng: 127.139,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G015',
    name: '산수고원',
    lat: 37.538,
    lng: 127.14,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G016',
    name: '다람',
    lat: 37.54,
    lng: 127.132,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G017',
    name: '함경면옥',
    lat: 37.535,
    lng: 127.126,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G018',
    name: '강동해물찜해천탕',
    lat: 37.532,
    lng: 127.125,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G019',
    name: '한촌설렁탕 강동점',
    lat: 37.533,
    lng: 127.128,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G020',
    name: '육대쌈암사점',
    lat: 37.55,
    lng: 127.147,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G021',
    name: '산장가든',
    lat: 37.531,
    lng: 127.129,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G022',
    name: '신흥정육식당',
    lat: 37.534,
    lng: 127.126,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G023',
    name: '풍년상회 쭈갈비',
    lat: 37.54,
    lng: 127.142,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G024',
    name: '길조본점',
    lat: 37.538,
    lng: 127.141,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G025',
    name: '함흥본가면옥 강동점',
    lat: 37.547,
    lng: 127.143,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G026',
    name: '봉래면옥',
    lat: 37.536,
    lng: 127.125,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
  {
    id: 'G027',
    name: '오륜정',
    lat: 37.539,
    lng: 127.138,
    subtitle: '식당',
    binuScore: 4.5,
    starScore: 4.7,
    tags: ['hasSoap', 'hasToiletPaper', 'hasWarmWater'],
  },
];

export interface SearchParams {
  region?: Region;
  coord?: Coord;
  placeId?: string;
  sort?: string;
  query?: string;
  tags?: string[];
}

export function fetchPlaces({
  region,
  placeId,
  query,
  sort,
  tags,
}: SearchParams): Place[] {
  const ret: Place[] = [];

  // 백엔드 전달 :: placeId 만 있으면 다른값 무시하고 해당 장소만, region 과 함께 placeId가 있으면 근처 장소들과 함께 리턴

  if (region) {
    for (const item of items) {
      if (
        item.lat >= region.latitude &&
        item.lat < region.latitude + region.latitudeDelta &&
        item.lng >= region.longitude &&
        item.lng < region.longitude + region.longitudeDelta
      ) {
        ret.push({...item});
      }
    }
  }

  return ret;
}
