# 🧼 Binu App

사용자 리뷰 기반의 음식점, 카페 화장실 위생 리뷰 플랫폼  
**하이브리드 앱 기반 - React Native (Mobile) + Next.js (Web)**

---

## 🎨 디자인

[Figma 디자인 링크 보기](https://www.figma.com/design/ry3a6qSlTls7arYqEqC5bw/%EB%B9%84%EB%88%84%EC%9E%88%EC%96%B4-?node-id=9-370&t=ycNrlj0VxjDPS0fA-1)

> _와이어프레임 및 UI 컴포넌트 구조 확인 가능_

---

## 📦 프로젝트 구조 (Monorepo)

binu-app/
├── apps/
│ ├── mobile/ # React Native 앱 (iOS/Android)
│ └── web/ # Next.js 웹 앱
├── packages/
│ ├── ui/ # 공통 UI 컴포넌트
│ └── config/ # ESLint, TS config 등 공통 설정
├── pnpm-workspace.yaml
├── package.json
└── README.md

## 🛠 기술 스택

| 플랫폼 | 기술                                                     |
| ------ | -------------------------------------------------------- |
| 모바일 | React Native, TypeScript, Hermes, iOS/Android            |
| 웹     | Next.js, React, TypeScript, TailwindCSS                  |
| 공통   | PNPM Monorepo, GitHub Actions (CI), Conventional Commits |

## 🚀 개발 실행

### 전체 설치

```bash
pnpm install
```

### 웹 실행

```bash
pnpm --filter web dev
```

### 모바일 실행(IOS)

```bash
cd apps/mobile
pnpm install
cd ios && pod install && cd ..
npx react-native run-ios
```

## 📄 커밋 컨벤션

feat(mobile): 로그인 화면 추가
fix(web): 다크모드 오류 수정
chore: 패키지 업데이트

## 🧩 향후 계획

- 로그인/회원가입 기능

- 배포 자동화 (Vercel)

- 공통 UI 컴포넌트 패키지 분리

## 🙋‍♀️ Author

sol
