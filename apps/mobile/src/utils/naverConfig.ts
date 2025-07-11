import {NaverLoginInitParams} from '@react-native-seoul/naver-login';
import {Platform} from 'react-native';

export const naverKeys: NaverLoginInitParams = Platform.select({
  ios: {
    consumerKey: 'kPNWquhkMfCjXVbHiR_Y',
    consumerSecret: 'Ghan60nez7',
    appName: 'Binu',
    serviceUrlSchemeIOS: 'naverkPNWquhkMfCjXVbHiR_Y',
    disableNaverAppAuthIOS: false,
  },
  android: {
    consumerKey: 'PNWquhkMfCjXVbHiR_Y',
    consumerSecret: 'Ghan60nez7',
    appName: 'Binu',
  },
}) as NaverLoginInitParams;
