export type Place = {
  id: string;
  title: string;
  subtitle: string;
  binuScore: number;
  starScore: number;
  tags: string[];
  ai?: boolean;
  bookmark?: boolean;
};

export type Review = {
  id: string;
  userNick: string;
  date: string;
  binuScore: number;
  content: string;
  profileImgUrl: string;
};

export type PlaceDetails = {
  title: string;
  subtitle: string;
  binuScore: number;
  starScore: number;
  tags: string[];
  ai?: boolean;
  bookmark?: boolean;
  reviews: Review[];
};
