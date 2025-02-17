import React, { useEffect, useState } from 'react';
import BoardSearchForm from '@/components/board/BoardSearchForm';
import BoardTable from '@/components/board/BoardTable';
import BoardTableSkeleton from '@/components/board/skeleton/BoardTableSkeleton';
import BoardPagination from '@/components/board/BoardPagination';
import { useIssueList } from '@/hooks/useGitHubIssues';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const FreeBoard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<{
    searchType: string;
    keyword: string;
  } | null>(null);
  
  const { data, isLoading, isFetching } = useIssueList('FREE', page, searchParams);
  const navigate = useNavigate();
  
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

  const handlePostClick = (postId: number) => {
    navigate(`${postId}`);
  };

  return (
    <div>
      <Helmet>
        <title>자유게시판</title>
      </Helmet>
      <h2 className="mb-4">자유게시판</h2>

      <BoardSearchForm onSearch={handleSearch} onWrite={handleWrite} />

      {isLoading || isFetching ? (
        <BoardTableSkeleton />
      ) : (
        <>
          <BoardTable 
            posts={data?.issues || []} 
            onPostClick={handlePostClick} 
          />
        </>
      )}
      <BoardPagination
        currentPage={page}
        totalPages={data?.totalPages || 1}
        onPageChange={setPage}
      />
    </div>
  );
};

export default FreeBoard; 