# GitHub 게시판 앱

이 프로젝트는 React, TypeScript, Vite로 구축된 GitHub 게시판 애플리케이션입니다.

현재 github api 의 응답 헤더를 확인해보면
cache-control: private, max-age=60, s-maxage=60
서버 측에서 60 초 동안의 캐시를 강제하고 있는 것으로 보입니다.
해당 이유로 현재 데이터 패칭 시 캐싱 관련 즉시 업데이트 처리가 불가능한 이슈가 있습니다.

## 기술 스택

- **React**
- **TypeScript**
- **React Router**
- **React Query**
- **ESLint**
- **Prettier**
- **React Bootstrap**
- **Vite**

## 시작하기

### 사전 요구 사항

- Node.js (권장 버전: 20 이상)
- npm

### 애플리케이션 실행

1. 개발 서버 시작:
   ```sh
   npm run dev
   ```

## 프로젝트 구조

```
github-board-app/
├── public/
│   └── index.html              # HTML 템플릿
├── src/
│   ├── assets/                 # 이미지 등 정적 자산
│   ├── components/             # 공통 컴포넌트
│   │   ├── board/              # 게시판 관련 컴포넌트
│   │   │   ├── BoardDetail.tsx
│   │   │   ├── BoardDetailSkeleton.tsx
│   │   │   ├── BoardTableSkeleton.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── contexts/               # React Context Provider
│   │   ├── ModalContext.tsx
│   │   └── ...
│   ├── hooks/                  # 공통 커스텀 훅
│   │   ├── useGitHubIssues.ts
│   │   └── ...
│   ├── pages/                  # 페이지 컴포넌트
│   │   ├── board/              # 페이지 구조 정의
│   │   │   ├── FreeBoardDetail.tsx
│   │   │   └── ...
│   │   └── ...
│   ├── utils/                  # 유틸리티 함수
│   │   ├── dateFormat.ts
│   │   └── ...
│   ├── App.tsx                 # 메인 앱 컴포넌트
│   ├── main.tsx                # 진입점
│   └── ...
├── .nvmrc                      # Node 버전 구성
├── package.json                # 프로젝트 메타데이터 및 의존성
├── tsconfig.json               # TypeScript 구성
└── vite.config.ts              # Vite 구성
```
