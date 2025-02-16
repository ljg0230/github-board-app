import React, { useState } from 'react';
import BoardSearchForm from '@/components/board/BoardSearchForm';
import BoardTable from '@/components/board/BoardTable';
import BoardTableSkeleton from '@/components/board/BoardTableSkeleton';
import BoardPagination from '@/components/board/BoardPagination';
import { useIssueList } from '@/hooks/useGitHubIssues';
import { useNavigate } from 'react-router-dom';

const FreeBoard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<{
    searchType: string;
    keyword: string;
  } | null>(null);
  
  const { data, isLoading } = useIssueList('FREE', page, searchParams || undefined);
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
      <h2 className="mb-4">자유게시판</h2>
      
      <BoardSearchForm 
        onSearch={handleSearch}
        onWrite={handleWrite}
      />

      {isLoading ? (
        <BoardTableSkeleton />
      ) : (
        <BoardTable 
          posts={data?.issues || []}
          onPostClick={handlePostClick}
        />
      )}

      <BoardPagination
        currentPage={data?.pagination.currentPage || 1}
        totalPages={Math.ceil((data?.total_count || 0) / 10)}
        onPageChange={setPage}
      />
    </div>
  );
};

export default FreeBoard; 