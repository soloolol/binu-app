/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {usePermissionStore} from '../stores/usePermissionStore';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {View, Text, Button, Platform, PermissionsAndroid} from 'react-native';
import {CameraIcon, MapPinCheck} from 'lucide-react-native';

export default function PermissionScreen() {
  const setHasPermissions = usePermissionStore(
    state => state.setHasPermissions,
  );

  useEffect(() => {
    checkPermissions(() => setHasPermissions(true));
  });

  async function checkPermissions(cb: () => void) {
    try {
      if (Platform.OS === 'android') {
        //TODO:: 안드로이드 권한 체크
      } else {
        const locStatus = await check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        const photoStatus = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);

        if (locStatus === RESULTS.GRANTED && photoStatus === RESULTS.GRANTED) {
          cb();
        }
        if (locStatus === RESULTS.BLOCKED || photoStatus === RESULTS.BLOCKED) {
          cb();
        }
      }
    } catch (error) {
      console.error('권한 체크 오류:', error);
    }
  }

  const requestPermissions = useCallback(async (cb: () => void) => {
    try {
      if (Platform.OS === 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        );
      } else {
        await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
      }
      cb();
    } catch (error) {
      console.error('권한 요청 오류:', error);
    }
  }, []);

  return (
    <View className="flex-col flex-1 w-full justify-center items-center gap-12 px-6 bg-white">
      <Text className="text-xl font-semibold">
        비누있어를 시작하려면 다음 권한이 필요해요
      </Text>
      <View className="flex w-4/5 gap-5">
        <View className="flex items-start justify-center">
          <View className="flex-row justify-center gap-2">
            <MapPinCheck strokeWidth={0.8} fill={'#a1f4de'} />
            <Text className="text-lg font-semibold">내 위치 정보 허용</Text>
          </View>
          <Text>내 위치를 기반으로 더 편리한 지도 검색이 가능해요</Text>
        </View>
        <View className="flex items-start justify-center">
          <View className="flex-row justify-center gap-2">
            <CameraIcon strokeWidth={0.8} />
            <Text className="text-lg font-semibold">사진첩 접근 (선택)</Text>
          </View>
          <Text>프로필 사진 변경시 사진첩에 있는 사진을 사용할 수 있어요</Text>
        </View>
      </View>

      <Button
        title="확인"
        onPress={() => requestPermissions(() => setHasPermissions(true))}
      />
    </View>
  );
}
