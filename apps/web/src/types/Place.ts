export interface Place {
  id: string;
  name: string;
  subtitle: string;
  binuScore: number;
  starScore: number;
  tags: string[];
  ai?: boolean;
}

export type Review = {
  id: string;
  userId: string;
  userNick: string;
  date: string;
  binuScore: number;
  content: string;
  profileImgUrl: string;
};

export interface PlaceDetails extends Place {
  reviews: Review[];
}
