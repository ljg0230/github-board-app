import { Issue } from '@/api/config';
import { getIssueList } from '@/api/github';
import { freeBoardPosts, questionBoardPosts } from '@/mocks/boardData';

interface BoardListResponse {
  issues: Issue[];
  pagination: {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
  };
}

// Mock API
export const getMockBoardList = async (
  boardType: 'FREE' | 'QNA',
  page: number = 1,
  perPage: number = 10,
  searchType?: string,
  keyword?: string
): Promise<BoardListResponse> => {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) => setTimeout(resolve, 500));

  const posts = boardType === 'FREE' ? freeBoardPosts : questionBoardPosts;

  let filteredPosts = posts;
  if (keyword) {
    const searchKeyword = keyword.toLowerCase();
    filteredPosts = posts.filter((post) => {
      if (searchType === '제목') {
        return post.title.toLowerCase().includes(searchKeyword);
      } else if (searchType === '내용') {
        return post.body.toLowerCase().includes(searchKeyword);
      } else {
        return (
          post.title.toLowerCase().includes(searchKeyword) ||
          post.body.toLowerCase().includes(searchKeyword)
        );
      }
    });
  }

  const totalCount = filteredPosts.length;
  const totalPages = Math.ceil(totalCount / perPage);
  const startIndex = (page - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedPosts = filteredPosts.slice(startIndex, endIndex);

  return {
    issues: paginatedPosts,
    pagination: {
      currentPage: page,
      perPage,
      totalPages,
      totalCount,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1
    }
  };
};

// Real GitHub API
export const getGitHubBoardList = async (
  boardType: 'FREE' | 'QNA',
  page: number = 1,
  perPage: number = 10,
  searchType?: string,
  keyword?: string
): Promise<BoardListResponse> => {
  try {
    const response = await getIssueList(boardType, page);

    let filteredIssues = response.issues;
    if (keyword) {
      const searchKeyword = keyword.toLowerCase();
      filteredIssues = response.issues.filter((issue) => {
        if (searchType === '제목') {
          return issue.title.toLowerCase().includes(searchKeyword);
        } else if (searchType === '내용') {
          return issue.body.toLowerCase().includes(searchKeyword);
        } else {
          return (
            issue.title.toLowerCase().includes(searchKeyword) ||
            issue.body.toLowerCase().includes(searchKeyword)
          );
        }
      });
    }

    return {
      issues: filteredIssues,
      pagination: {
        currentPage: page,
        perPage,
        totalPages: Math.ceil(response.total_count / perPage),
        totalCount: response.total_count,
        hasNextPage: page * perPage < response.total_count,
        hasPrevPage: page > 1
      }
    };
  } catch (error) {
    console.error('Error fetching board list:', error);
    throw error;
  }
};

// 환경에 따라 적절한 API 선택
export const getBoardList =
  process.env.NODE_ENV === 'development'
    ? getMockBoardList
    : getGitHubBoardList;
