# GitHub 게시판 앱

이 프로젝트는 React, TypeScript, Vite로 구축된 GitHub 게시판 애플리케이션입니다.

## 기술 스택

- **React**
- **TypeScript** - 정적 타입 적용
- **React Router DOM** - 라우팅
- **TanStack Query** - 서버 사이드 상태 관리
- **React Bootstrap** - UI 컴포넌트
- **React Markdown** - 마크다운 렌더링
- **React Helmet Async** - 동적 head 태그 관리
- **Swiper** - 이미지 슬라이더
- **Axios** - HTTP 클라이언트
- **Octokit** - GitHub API 클라이언트
- **ESLint** - 코드 린팅
- **Prettier** - 코드 포맷팅
- **Vite** - 빌드 도구


## 시작하기

### 사전 요구 사항

- Node.js (권장 버전: 20 이상)
- npm

### 애플리케이션 실행

1. 개발 서버 시작:
   ```sh
   npm run dev
   ```


## TODO LIST (개선할 점)

- 게시판 목록 페이징 처리
- 게시판 검색 관련 개선
- 게시판 내 부가 기능 추가 (조회수, 좋아요, 댓글 등)
- 게시판 조회수 기능 추가
- Auth 시스템 구축
- 디자인 시스템 고도화 (스타일링 방식 개선)
- 접근성 및 사용성 개선
- 컴포넌트 설계 고도화 
- 성능 최적화 (코드 스플리팅, 이미지 최적화, 캐싱 등)
- 타입 정의 개선
- ...


## 프로젝트 구조

```
github-board-app/
├── src/
│   ├── api/               # API 관련 모듈
│   │   └── ...
│   ├── assets/               # 이미지 등 정적 자산
│   │   └── images/
│   ├── components/          # 공통 컴포넌트
│   │   ├── board/          # 게시판 관련 컴포넌트
│   │   ├── common/         # 공통 UI 컴포넌트
│   │   └── home/          # 홈 화면 컴포넌트
│   ├── contexts/          # React Context
│   │   └── ...
│   ├── hooks/            # 커스텀 훅
│   │   └── ...
│   ├── pages/           # 페이지 컴포넌트
│   │   ├── board/
│   │   └── Home.tsx
│   ├── utils/          # 유틸리티 함수
│   ├── App.tsx        # 메인 앱 컴포넌트
│   └── main.tsx       # 앱 진입점
├── .eslintrc.js      # ESLint 설정
├── .prettierrc       # Prettier 설정
├── tsconfig.json     # TypeScript 설정
├── vite.config.ts    # Vite 설정
└── package.json 
```