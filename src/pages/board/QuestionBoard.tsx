import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BoardSearchForm from '@/components/board/BoardSearchForm';
import BoardTable from '@/components/board/BoardTable';
import BoardTableSkeleton from '@/components/board/skeleton/BoardTableSkeleton';
import BoardPagination from '@/components/board/BoardPagination';
import { useBoardData } from '@/hooks/useBoardData';

const QuestionBoard: React.FC = () => {
  const navigate = useNavigate();
  const {
    issues,
    totalPages,
    isLoading,
    isFetching,
    page,
    setPage,
    handleSearch,
    cancelSearch
  } = useBoardData('QNA');

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
            posts={issues}
            onPostClick={(issueNumber) => navigate(`${issueNumber}`)}
          />
          <BoardPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </>
      )}
    </div>
  );
};

export default QuestionBoard;
