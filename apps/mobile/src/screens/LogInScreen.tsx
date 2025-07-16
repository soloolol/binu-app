import React, {useState} from 'react';
import {useAuthStore} from '../stores/useAuthStore';
import {Text, View} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import LogoSvg from '../../assets/images/logo.svg';
import NaverSvg from '../../assets/images/naver_logo.svg';
import KakaoSvg from '../../assets/images/kakao_logo.svg';
import LoginButton from '@/components/LoginButton';

interface UserInfo {
  name?: string;
  email: string;
  mobileNumber?: number;
}

export default function LogInScreen() {
  const [userInfo, setUserInfo] = useState<UserInfo>();
  const login = useAuthStore(state => state.login);

  const handleLoginSuccess = async (info: any) => {
    setUserInfo(info);
    console.log('로그인 info:', info);
    login();
  };

  return (
    <ScreenLayout>
      <View className="flex flex-col justify-center items-center w-full h-full">
        <View className="flex flex-col items-center w-full gap-y-20">
          <View className="flex flex-col items-center gap-5">
            <View className="animate-bounce">
              <LogoSvg width={200} height={200} />
            </View>
            <Text className="text-lg font-mono font-stretch-150%">
              화장실 깨끗한데로 가고싶은데..💭
            </Text>
          </View>
          <View className="flex flex-col items-center w-full gap-4">
            <LoginButton
              title="카카오톡으로 시작하기"
              provider="kakao"
              onLoginSuccess={handleLoginSuccess}>
              <KakaoSvg width={20} height={20} />
            </LoginButton>
            <LoginButton
              title="네이버로 시작하기"
              provider="naver"
              onLoginSuccess={handleLoginSuccess}>
              <NaverSvg width={20} height={20} />
            </LoginButton>
          </View>
        </View>
      </View>
    </ScreenLayout>
  );
}
