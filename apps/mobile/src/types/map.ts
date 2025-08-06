export interface Coord {
  latitude: number;
  longitude: number;
}
export interface Region extends Coord {
  latitudeDelta: number;
  longitudeDelta: number;
}
