import { useQuery } from '@tanstack/react-query';
import { getIssueList, getIssue } from '@/api/github';
import { BoardType } from '@/api/config';

interface SearchParams {
  searchType: string;
  keyword: string;
}

// 이슈 목록 조회 hook
export const useIssueList = (
  boardType: BoardType,
  page: number = 1,
  searchParams?: SearchParams
) => {
  return useQuery({
    queryKey: ['issues', boardType, page, searchParams],
    queryFn: () => getIssueList(boardType, page, searchParams),
    placeholderData: (previousData) => previousData,
    staleTime: 1000 * 60, // 1분
    retry: false, // 에러 발생 시 재시도 하지 않음
    refetchOnWindowFocus: false,
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