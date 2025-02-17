import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssueList, getIssue, getTotalIssueCount, createIssue, deleteIssue } from '@/api/github';
import { BoardType, Issue } from '@/api/config';
import { useNavigate } from 'react-router-dom';

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
  const queryClient = useQueryClient();
  
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['issues', boardType, page, searchParams],
    queryFn: async () => {
      const response = await getIssueList(boardType, page, searchParams || undefined);
      return {
        issues: response.issues,
        totalPages: Math.ceil(response.total_count / ITEMS_PER_PAGE)
      };
    }
  });

  const cancelSearch = () => {
    queryClient.cancelQueries({ queryKey: ['issues', boardType, page, searchParams] });
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
    mutationFn: ({ boardType, title, body }: {
      boardType: BoardType;
      title: string;
      body: string;
    }) => createIssue(boardType, title, body),
    
    onSuccess: async (newIssue, { boardType }) => {
      const formattedIssue: Issue = {
        number: newIssue.number,
        title: newIssue.title,
        body: newIssue.body || '',
        created_at: newIssue.created_at,
        updated_at: newIssue.updated_at,
        comments: newIssue.comments,
        user: {
          login: newIssue.user?.login || '',
          avatar_url: newIssue.user?.avatar_url || ''
        },
        labels: newIssue.labels.map(label => ({
          name: typeof label === 'string' ? label : (label.name || ''),
          color: typeof label === 'string' ? '' : (label.color || '')
        })),
        state: newIssue.state as 'open' | 'closed'
      };

      queryClient.setQueryData<IssueListResponse>(
        ['issues', boardType, 1],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            issues: [formattedIssue, ...oldData.issues].slice(0, ITEMS_PER_PAGE),
            totalPages: Math.ceil((oldData.issues.length + 1) / ITEMS_PER_PAGE)
          };
        }
      );

      queryClient.setQueryData<number>(
        [TOTAL_COUNT_KEY, boardType],
        (oldCount = 0) => oldCount + 1
      );

      await queryClient.invalidateQueries({
        queryKey: ['issues', boardType],
        exact: false,
        refetchType: 'all'
      });

      await queryClient.invalidateQueries({
        queryKey: [TOTAL_COUNT_KEY, boardType],
        exact: true,
        refetchType: 'all'
      });
    }
  });
};

export const useDeleteIssue = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ boardType, issueNumber }: {
      boardType: BoardType;
      issueNumber: number;
    }) => deleteIssue(boardType, issueNumber),

    onSuccess: async (_, { boardType, issueNumber }) => {
      // 현재 캐시된 데이터에서 삭제된 이슈 제거
      queryClient.setQueryData<IssueListResponse>(
        ['issues', boardType, 1],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            issues: oldData.issues.filter(issue => issue.number !== issueNumber),
            totalPages: Math.ceil((oldData.issues.length - 1) / ITEMS_PER_PAGE)
          };
        }
      );

      // 전체 개수 감소
      queryClient.setQueryData<number>(
        [TOTAL_COUNT_KEY, boardType],
        (oldCount = 0) => Math.max(0, oldCount - 1)
      );

      navigate(`/board/${boardType.toLowerCase()}`);
    }
  });
}; 