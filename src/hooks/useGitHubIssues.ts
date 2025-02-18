import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getIssueList,
  getIssue,
  getTotalIssueCount,
  createIssue,
  deleteIssue,
  updateIssue
} from '@/api/github';
import { BoardType } from '@/api/config';

interface SearchParams {
  searchType: string;
  keyword: string;
}

const TOTAL_COUNT_KEY = 'issuesCount';
const ITEMS_PER_PAGE = 10; // 페이지당 아이템 수

// 이슈 목록 조회 hook
export const useIssueList = (
  boardType: BoardType,
  page: number = 1,
  searchParams?: SearchParams | null
) => {
  const queryClient = useQueryClient();

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['issues', boardType, page, searchParams],
    queryFn: async () => {
      const response = await getIssueList(
        boardType,
        page,
        searchParams || undefined
      );
      return {
        issues: response.issues,
        totalPages: Math.ceil(response.total_count / ITEMS_PER_PAGE)
      };
    }
  });

  const cancelSearch = () => {
    queryClient.cancelQueries({
      queryKey: ['issues', boardType, page, searchParams]
    });
  };

  return { data, isLoading, isFetching, cancelSearch };
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

// 이슈 등록 mutation hook
export const useCreateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardType,
      title,
      body
    }: {
      boardType: BoardType;
      title: string;
      body: string;
    }) => createIssue(boardType, title, body),

    onSuccess: async (newIssue, { boardType }) => {
      await queryClient.invalidateQueries({
        queryKey: ['issues', boardType]
      });
      await queryClient.invalidateQueries({
        queryKey: [TOTAL_COUNT_KEY, boardType]
      });

      queryClient.removeQueries({
        queryKey: ['issues', boardType],
        type: 'all'
      });
    }
  });
};

// 게시글 삭제
export const useDeleteIssue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      boardType,
      issueNumber
    }: {
      boardType: BoardType;
      issueNumber: number;
    }) => deleteIssue(boardType, issueNumber),

    onSuccess: async (_, { boardType, issueNumber }) => {
      await queryClient.invalidateQueries({
        queryKey: ['issues', boardType]
      });
      await queryClient.invalidateQueries({
        queryKey: [TOTAL_COUNT_KEY, boardType]
      });

      queryClient.removeQueries({
        queryKey: ['issues', boardType],
        type: 'all'
      });
    }
  });
};

// 게시글 수정
export const useUpdateIssue = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      boardType,
      issueNumber,
      title,
      body
    }: {
      boardType: BoardType;
      issueNumber: number;
      title: string;
      body: string;
    }) => updateIssue(boardType, issueNumber, title, body),

    onSuccess: async (updatedIssue, { boardType, issueNumber }) => {
      queryClient.invalidateQueries({
        queryKey: ['issue', boardType, String(issueNumber)],
        exact: true,
        refetchType: 'all'
      });
      queryClient.invalidateQueries({
        queryKey: ['issues', boardType],
        exact: false,
        refetchType: 'all'
      });
    }
  });
};
