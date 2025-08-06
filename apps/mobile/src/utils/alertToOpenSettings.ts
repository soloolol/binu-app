import {Alert} from 'react-native';
import {openSettings} from 'react-native-permissions';

/**
 * 설정 화면으로 이동하는 Alert 유틸
 * @param title     Alert 제목
 * @param message   Alert 본문
 * @param cancelText (선택) 취소 버튼 텍스트 (기본값: '취소')
 * @param confirmText (선택) 확인 버튼 텍스트 (기본값: '설정으로 이동')
 */
export const alertToOpenSettings = (
  title: string,
  message: string,
  cancelText = '취소',
  confirmText = '설정으로 이동',
) => {
  Alert.alert(title, message, [
    {
      text: cancelText,
      style: 'cancel',
    },
    {
      text: confirmText,
      onPress: () => {
        openSettings().catch(() => {
          Alert.alert('설정 앱을 열 수 없습니다.');
        });
      },
    },
  ]);
};
