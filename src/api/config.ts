import { Octokit } from 'octokit';

// GitHub API 인스턴스 생성
export const octokit = new Octokit({
  auth: import.meta.env.VITE_GITHUB_TOKEN,
  request: {
    headers: {
      'If-None-Match': ''
    }
  }
});

// 게시판별 저장소 설정
export const REPOS = {
  FREE: import.meta.env.VITE_FREE_BOARD_REPO,
  QNA: import.meta.env.VITE_QUESTION_BOARD_REPO
} as const;

export interface Issue {
  number: number;
  title: string;
  body: string;
  created_at: string;
  updated_at: string;
  comments: number;
  user: {
    login: string;
    avatar_url: string;
  };
  labels: Array<{
    name: string;
    color: string;
  }>;
  state: 'open' | 'closed';
}

export type BoardType = 'FREE' | 'QNA'; 