import React, { useState } from 'react';
import BoardSearchForm from '@/components/board/BoardSearchForm';
import BoardTable from '@/components/board/BoardTable';
import BoardTableSkeleton from '@/components/board/skeleton/BoardTableSkeleton';
import BoardPagination from '@/components/board/BoardPagination';
import { useModal } from '@/contexts/ModalContext';
import { useQuery } from '@tanstack/react-query';
import { getBoardList } from '@/api/board';
import { Helmet } from 'react-helmet-async';

const QuestionBoard: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchParams, setSearchParams] = useState<{
    searchType: string;
    keyword: string;
  } | null>(null);
  
  const { data, isLoading } = useQuery({
    queryKey: ['board', 'QNA', page, searchParams],
    queryFn: () => getBoardList(
      'QNA', 
      page, 
      10, 
      searchParams?.searchType,
      searchParams?.keyword
    )
  });

  const { confirm } = useModal();
  
  const handleSearch = (searchType: string, keyword: string) => {
    setSearchParams({ searchType, keyword });
    setPage(1);
  };

  const handleWrite = () => {
    console.log('글쓰기');
  };

  const handlePostClick = async (postId: number) => {
    const confirmed = await confirm({
      message: `게시글 번호 ${postId}를 보시겠습니까?`,
      confirmText: '이동하기',
      cancelText: '취소'
    });
    
    if (confirmed) {
      console.log('게시글 상세 보기로 이동:', postId);
    }
  };

  return (
    <div>
      <Helmet>
        <title>질문게시판</title>
      </Helmet>
      <h2 className="mb-4">질문게시판</h2>

      <BoardSearchForm onSearch={handleSearch} onWrite={handleWrite} />

      {isLoading ? (
        <BoardTableSkeleton />
      ) : (
        <BoardTable posts={data?.issues || []} onPostClick={handlePostClick} />
      )}

      <BoardPagination
        currentPage={data?.pagination.currentPage || 1}
        totalPages={data?.pagination.totalPages || 0}
        onPageChange={setPage}
      />
    </div>
  );
};

export default QuestionBoard; 