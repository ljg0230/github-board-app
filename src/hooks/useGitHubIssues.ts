import { useQuery } from '@tanstack/react-query';
import { getIssueList, getIssue, getTotalIssueCount } from '@/api/github';
import { BoardType, Issue } from '@/api/config';

interface SearchParams {
  searchType: string;
  keyword: string;
}

interface IssueListResponse {
  issues: Issue[];
  totalPages: number;
}

const TOTAL_COUNT_KEY = 'issuesCount';
const ITEMS_PER_PAGE = 10;  // 페이지당 아이템 수

// 이슈 목록 조회 hook
export const useIssueList = (
  boardType: BoardType,
  page: number = 1,
  searchParams?: SearchParams | null
) => {
  const { data: totalItems } = useQuery({
    queryKey: [TOTAL_COUNT_KEY, boardType],
    queryFn: () => getTotalIssueCount(boardType)
  });

  return useQuery<IssueListResponse, Error>({
    queryKey: ['issues', boardType, page, searchParams],
    queryFn: async () => {
      const response = await getIssueList(boardType, page, searchParams || undefined);
      return {
        issues: response.issues,
        totalPages: Math.ceil((totalItems || 0) / ITEMS_PER_PAGE)
      };
    },
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!totalItems
  });
};

// 이슈 상세 조회 hook
export const useIssue = (boardType: BoardType, issueNumber: number) => {
  return useQuery({
    queryKey: ['issue', boardType, issueNumber],
    queryFn: () => getIssue(boardType, issueNumber),
    retry: false,
    refetchOnWindowFocus: false,
    enabled: !!issueNumber
  });
}; 