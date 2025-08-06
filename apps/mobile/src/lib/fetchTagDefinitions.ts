import {TagDefinitions, TagInfo} from '@/types/Tag';

const TAG_RES_SAMPLE: TagInfo[] = [
  {
    tagKey: 'hasSoap',
    label: '비누있음 🧼',
    oppositeLabel: '비누없음',
    index: 0,
    isRequired: true,
  },
  {
    tagKey: 'hasToiletPaper',
    label: '화장지있음 🧻',
    oppositeLabel: '화장지없음',
    index: 1,
    isRequired: true,
  },
  {
    tagKey: 'genderSeparated',
    label: '남/여 구분',
    oppositeLabel: '남/여 공용',
    index: 2,
    isRequired: true,
  },
  {tagKey: 'hasBidet', label: '비데', index: 3, isRequired: false},
  {tagKey: 'hasWarmWater', label: '온수 ♨️', index: 4, isRequired: false},
  {tagKey: 'hasHandTowel', label: '핸드타월', index: 5, isRequired: false},
  {
    tagKey: 'indoorFemaleOnly',
    label: '내부화장실(여)',
    index: 6,
    isRequired: false,
  },
  {
    tagKey: 'hasSeatCleaner',
    label: '변기시트클리너',
    index: 7,
    isRequired: false,
  },
  {tagKey: 'hasHandWash', label: '핸드워시', index: 8, isRequired: false},
  {
    tagKey: 'accessibleToilet',
    label: '장애인화장실',
    index: 9,
    isRequired: false,
  },
  {
    tagKey: 'hasDiaperTable',
    label: '기저귀교환대',
    index: 10,
    isRequired: false,
  },
];

export default async function fetchTagDefinitions(): Promise<TagDefinitions> {
  // const res = await fetch(`${process.env.API_BASE_URL}/tags`, {
  //   // next: { revalidate: 60 }, // ISR 사용 시
  // });
  // const tagList: TagInfo[] = await res.json();
  return Object.fromEntries(TAG_RES_SAMPLE.map(t => [t.tagKey, t]));
}
