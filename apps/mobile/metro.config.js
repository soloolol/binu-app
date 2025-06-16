const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');
const {withNativeWind} = require('nativewind/metro');

// 1. 기본 설정 불러오기
const defaultConfig = getDefaultConfig(__dirname);

// 2. SVG 대응: asset 확장자에서 svg 제거 & source 확장자에 svg 추가
const {assetExts, sourceExts} = defaultConfig.resolver;

const svgAndAliasConfig = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'), // SVG를 React 컴포넌트처럼 변환
  },
  resolver: {
    assetExts: assetExts.filter(ext => ext !== 'svg'), // SVG는 asset이 아님
    sourceExts: [...sourceExts, 'svg'], // 대신 source로 간주
  },
};

// 3. alias 설정 (예: @ui → ../../packages/ui)
defaultConfig.resolver.alias = {
  '@ui': path.resolve(__dirname, '../../packages/ui'),
};

// 4. watchFolders 추가 (루트 node_modules 감시)
defaultConfig.watchFolders = [path.resolve(__dirname, '../../node_modules')];

// 5. NativeWind 설정과 병합
module.exports = withNativeWind(mergeConfig(defaultConfig, svgAndAliasConfig), {
  input: './global.css', // tailwind 스타일 적용용 entry point
});
