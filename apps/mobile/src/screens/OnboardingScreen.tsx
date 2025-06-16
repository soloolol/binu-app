import {Text, View} from 'react-native';
import ScreenLayout from '../components/ScreenLayout';
import LogoSvg from '../../assets/images/logo.svg';

export default function OnboardingScreen() {
  return (
    <ScreenLayout>
      <View className="flex row-auto align-middle justify-center items-center w-full h-screen-safe">
        <LogoSvg width={200} height={200} />
        <Text className="font-source text-xl mb-8">
          깨끗한 화장실 어디 없나..💭
        </Text>
      </View>
    </ScreenLayout>
  );
}
