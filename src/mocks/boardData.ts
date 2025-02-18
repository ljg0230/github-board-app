import { Issue } from '@/api/config';

// GitHub API 형식의 날짜 문자열 생성 함수
const generateRandomDate = () => {
  const start = new Date(2024, 0, 1);
  const end = new Date(2024, 1, 29);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString(); // 2024-02-16T11:09:01.000Z 형식
};

// 자유게시판 mock 데이터
export const freeBoardPosts: Issue[] = Array.from(
  { length: 150 },
  (_, index) => ({
    number: index + 1,
    title: `[자유] 무궁화 꽃이 피었습니다 ${index + 1}`,
    user: {
      login: `user${Math.floor(Math.random() * 10) + 1}`,
      avatar_url: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?v=4`
    },
    body: `자유게시판의 테스트 게시글 ${index + 1}입니다. 무궁화 꽃이 피었습니다...`,
    created_at: generateRandomDate(),
    updated_at: generateRandomDate(),
    comments: Math.floor(Math.random() * 10),
    state: Math.random() > 0.2 ? 'open' : 'closed',
    labels: []
  })
);

// 질문게시판 mock 데이터
export const questionBoardPosts: Issue[] = Array.from(
  { length: 150 },
  (_, index) => ({
    number: index + 1,
    title: `[질문] 리액트 관련 질문입니다 ${index + 1}`,
    user: {
      login: `user${Math.floor(Math.random() * 10) + 1}`,
      avatar_url: `https://avatars.githubusercontent.com/u/${Math.floor(Math.random() * 1000)}?v=4`
    },
    body: `질문게시판의 테스트 게시글 ${index + 1}입니다. 리액트 관련 질문입니다...`,
    created_at: generateRandomDate(),
    updated_at: generateRandomDate(),
    comments: Math.floor(Math.random() * 10),
    state: Math.random() > 0.2 ? 'open' : 'closed',
    labels: []
  })
);
