import {NaverLoginInitParams} from '@react-native-seoul/naver-login';
import {Platform} from 'react-native';
import Config from 'react-native-config';

export const naverKeys: NaverLoginInitParams = Platform.select({
  ios: {
    consumerKey: Config.NAVER_LOGIN_CONSUMER_KEY,
    consumerSecret: Config.NAVER_LOGIN_CONSUMER_SECRET,
    appName: 'Binu',
    serviceUrlSchemeIOS: Config.NAVER_SERVICE_URL_SCHEME_IOS,
    disableNaverAppAuthIOS: false,
  },
  android: {
    consumerKey: Config.NAVER_LOGIN_CONSUMER_KEY,
    consumerSecret: Config.NAVER_LOGIN_CONSUMER_SECRET,
    appName: 'Binu',
  },
}) as NaverLoginInitParams;
