import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BoardSearchForm from '@/components/board/BoardSearchForm';
import BoardTable from '@/components/board/BoardTable';
import BoardTableSkeleton from '@/components/board/skeleton/BoardTableSkeleton';
import BoardPagination from '@/components/board/BoardPagination';
import { useIssueList } from '@/hooks/useGitHubIssues';

const QuestionBoard: React.FC = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<{
    searchType: string;
    keyword: string;
  } | null>(null);

  const { data, isLoading, isFetching, cancelSearch } = useIssueList(
    'QNA',
    page,
    searchParams
  );

  const filteredIssues = useMemo(() => {
    return data?.issues.filter((issue) => issue.state !== 'closed');
  }, [data]);

  const handleSearch = (searchType: string, keyword: string) => {
    if (keyword.trim()) {
      setSearchParams({ searchType, keyword });
    } else {
      setSearchParams(null);
    }
    setPage(1);
  };

  const handleWrite = () => {
    navigate('write');
  };

  return (
    <div>
      <Helmet>
        <title>질문게시판</title>
      </Helmet>
      <h2 className="mb-4">질문게시판</h2>

      <BoardSearchForm
        onSearch={handleSearch}
        onWrite={handleWrite}
        onCancelSearch={cancelSearch}
        isLoading={isLoading || isFetching}
      />

      {isLoading || isFetching ? (
        <BoardTableSkeleton />
      ) : (
        <>
          <BoardTable
            posts={filteredIssues || []}
            onPostClick={(issueNumber) => navigate(`${issueNumber}`)}
          />
          <BoardPagination
            currentPage={page}
            totalPages={data?.totalPages || 1}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default QuestionBoard;
