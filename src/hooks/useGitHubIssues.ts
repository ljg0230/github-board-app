import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getIssueList, getIssue, getTotalIssueCount, createIssue } from '@/api/github';
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
    queryFn: () => getTotalIssueCount(boardType),
    staleTime: 0
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
    enabled: !!totalItems,
    staleTime: 0
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
    
    onSuccess: async (newIssue) => {
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
        ['issues', 'FREE', 1],
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
        [TOTAL_COUNT_KEY, 'FREE'],
        (oldCount = 0) => oldCount + 1
      );

      await queryClient.invalidateQueries({
        queryKey: ['issues', 'FREE'],
        exact: false,
        refetchType: 'all'
      });

      await queryClient.invalidateQueries({
        queryKey: [TOTAL_COUNT_KEY, 'FREE'],
        exact: true,
        refetchType: 'all'
      });
    }
  });
}; 