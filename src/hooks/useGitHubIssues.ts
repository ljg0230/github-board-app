import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssueList, getIssue, getTotalIssueCount, createIssue, deleteIssue } from '@/api/github';
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
  return useQuery<IssueListResponse, Error>({
    queryKey: ['issues', boardType, page, searchParams],
    queryFn: async () => {
      const response = await getIssueList(boardType, page, searchParams || undefined);
      return {
        issues: response.issues,
        totalPages: Math.ceil(response.total_count / ITEMS_PER_PAGE)
      };
    },
    retry: false,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 0,
    gcTime: 0,
    networkMode: 'always'
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

  return useMutation({
    mutationFn: ({ boardType, issueNumber }: {
      boardType: BoardType;
      issueNumber: number;
    }) => deleteIssue(boardType, issueNumber),

    onSuccess: async (_, { boardType }) => {
      queryClient.removeQueries({
        queryKey: ['issues', boardType]
      });
      queryClient.removeQueries({
        queryKey: [TOTAL_COUNT_KEY, boardType]
      });

      queryClient.prefetchQuery({
        queryKey: ['issues', boardType, 1],
        queryFn: () => getIssueList(boardType, 1)
      }),
      queryClient.prefetchQuery({
        queryKey: [TOTAL_COUNT_KEY, boardType],
        queryFn: () => getTotalIssueCount(boardType)
      })
    }
  });
}; 