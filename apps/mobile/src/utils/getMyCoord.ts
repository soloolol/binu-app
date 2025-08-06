import {Coord} from '@/types/map';
import Geolocation from 'react-native-geolocation-service';

export const getMyCoord = (): Promise<Coord> => {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        resolve({latitude, longitude});
      },
      error => {
        console.log(error.code, error.message);
        reject(error);
      },
      {enableHighAccuracy: true, timeout: 5000, maximumAge: 10000},
    );
  });
};
