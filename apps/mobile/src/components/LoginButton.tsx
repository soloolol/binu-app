import React, {ReactElement} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {
  login as kakaoLogin,
  getProfile as kakaoGetProfile,
} from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import {naverKeys} from '@/utils/naverConfig';

interface Props {
  children: ReactElement;
  title: string;
  provider: 'kakao' | 'naver';
  onLoginSuccess: (info: any) => void;
}

export default function LoginButton({
  children,
  title,
  provider,
  onLoginSuccess,
}: Props) {
  const handleKakaoLogin = async () => {
    try {
      const {accessToken} = await kakaoLogin();
      const {email, name, phoneNumber: mobileNumber} = await kakaoGetProfile();
      onLoginSuccess({
        email,
        // name,
        // mobileNumber,
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleNaverLogin = async () => {
    try {
      NaverLogin.initialize(naverKeys);
      const {isSuccess, successResponse, failureResponse} =
        await NaverLogin.login();
      if (isSuccess) {
        const accessToken = successResponse!.accessToken;
        const {response} = await NaverLogin.getProfile(accessToken);
        onLoginSuccess({
          email: response.id,
          // name: response.name,
          // mobileNumber: response.mobile
        });
      } else {
        throw new Error(failureResponse?.message);
      }
      console.log('네이버로그인중');
    } catch (e) {
      console.log('네이버로그인중 실패');
      console.error(e);
    }
  };

  return (
    <TouchableOpacity
      className="flex flex-row items-center justify-center w-2/3 py-4 gap-4 rounded-3xl border border-gray-700 border-1"
      onPress={provider === 'kakao' ? handleKakaoLogin : handleNaverLogin}>
      {children}
      <Text className="text-center font-semibold text-black">{title}</Text>
    </TouchableOpacity>
  );
}
