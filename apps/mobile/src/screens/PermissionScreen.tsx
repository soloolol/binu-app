/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect} from 'react';
import {usePermissionStore} from '../stores/usePermissionStore';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {View, Text, Button, Platform, PermissionsAndroid} from 'react-native';

export default function PermissionScreen() {
  const setPermissions = usePermissionStore(state => state.setPermissions);

  useEffect(() => {
    checkPermissions(() => setPermissions(true));
  });

  async function checkPermissions(cb: () => void) {
    try {
      if (Platform.OS === 'android') {
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
    <View className="flex-1 justify-center items-center px-6 bg-white">
      <Text className="text-xl font-semibold mb-4">
        비누있어를 시작하려면 다음 권한이 필요해요
      </Text>
      <Button
        title="확인"
        onPress={() => requestPermissions(() => setPermissions(true))}
      />
    </View>
  );
}
