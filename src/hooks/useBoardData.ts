import { useState, useCallback, useMemo } from 'react';
import { useIssueList } from './useGitHubIssues';
import { BoardType } from '@/api/config';


interface SearchParams {
  searchType: string;
  keyword: string;
}

export const useBoardData = (boardType: BoardType) => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

  const { data, isLoading, isFetching } = useIssueList(
    boardType,
    page,
    searchParams
  );

  const filteredIssues = useMemo(() => {
    return data?.issues.filter((issue) => issue.state !== 'closed');
  }, [data]);

  const handleSearch = useCallback((searchType: string, keyword: string) => {
    if (keyword.trim()) {
      setSearchParams({ searchType, keyword });
    } else {
      setSearchParams(null);
    }
    setPage(1);
  }, []);

  const cancelSearch = useCallback(() => {
    setSearchParams(null);
  }, []);

  return {
    issues: filteredIssues || [],
    totalPages: data?.totalPages || 1,
    isLoading,
    isFetching,
    page,
    setPage,
    handleSearch,
    cancelSearch,
    searchParams
  };
};