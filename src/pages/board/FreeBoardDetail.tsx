import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BoardDetail from '@/components/board/BoardDetail';
import BoardDetailSkeleton from '@/components/board/BoardDetailSkeleton';
import { useModal } from '@/contexts/ModalContext';
import { useIssue } from '@/hooks/useGitHubIssues';

const FreeBoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm } = useModal();
  
  const { data: issue, isLoading, isError } = useIssue('FREE', Number(id));

  const handleEdit = () => {
    navigate(`/board/free/${id}/edit`);
  };

  const handleDelete = async () => {
    const shouldDelete = await confirm({
      title: '게시글 삭제',
      message: '정말 삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소'
    });

    if (shouldDelete) {
      // GitHub Issue 삭제 로직 구현 예정
      console.log('Delete issue:', id);
      navigate('/board/free');
    }
  };

  if (isLoading) {
    return <BoardDetailSkeleton />;
  }

  if (isError || !issue) {
    return <div>게시글을 불러오는데 실패했습니다.</div>;
  }

  return (
    <div>
      <Helmet>
        <title>{issue.title}</title>
      </Helmet>
      <BoardDetail
        boardName="자유게시판"
        title={issue.title}
        author={issue.user?.login || '알 수 없음'}
        authorAvatar={issue.user?.avatar_url || ''}
        createdAt={issue.created_at}
        content={issue.body || ''}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default FreeBoardDetail;