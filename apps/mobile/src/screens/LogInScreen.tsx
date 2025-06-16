import React from 'react';
import {useAuthStore} from '../stores/useAuthStore';
import {Text, TouchableOpacity, View} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import LogoSvg from '../../assets/images/logo.svg';

export default function LogInScreen() {
  const login = useAuthStore(state => state.login);

  const handleKakaoLogin = async () => {
    console.log('카카오 로그인 시도');
    login();
  };

  const handleNaverLogin = async () => {
    // TODO: 실제 네이버 로그인 연동
    console.log('네이버 로그인 시도');
    login();
  };

  return (
    <ScreenLayout>
      <View className="flex row-auto align-middle justify-center items-center w-full h-screen-safe">
        <LogoSvg width={200} height={200} />

        <Text className="font-source-semi-bold text-3xl mb-8">비누있어?</Text>

        <TouchableOpacity
          className="bg-[#FEE500] w-2/3 py-4 rounded-2xl mb-4"
          onPress={handleKakaoLogin}>
          <Text className="text-center font-semibold text-black">
            카카오톡으로 시작하기
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-[#00C73C] w-2/3 py-4 rounded-2xl"
          onPress={handleNaverLogin}>
          <Text className="text-center font-semibold text-white">
            네이버로 시작하기
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenLayout>
  );
}
