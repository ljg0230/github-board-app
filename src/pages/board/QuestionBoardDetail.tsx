import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import BoardDetail from '@/components/board/BoardDetail';
import BoardDetailSkeleton from '@/components/board/skeleton/BoardDetailSkeleton';
import { useModal } from '@/contexts/ModalContext';
import { useIssue, useDeleteIssue } from '@/hooks/useGitHubIssues';

const QuestionBoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm } = useModal();
  const deleteIssueMutation = useDeleteIssue();

  const { data: issue, isLoading, isError } = useIssue('QNA', Number(id));

  const handleEdit = () => {
    navigate(`/board/qna/${id}/edit`);
  };

  const handleDelete = async () => {
    const shouldDelete = await confirm({
      message: '삭제하시겠습니까?',
      confirmText: '삭제',
      cancelText: '취소'
    });

    if (shouldDelete) {
      try {
        await deleteIssueMutation.mutateAsync({
          boardType: 'QNA',
          issueNumber: Number(id)
        });
        navigate('/board/qna');
      } catch (error) {
        console.error('삭제 실패:', error);
      }
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
        boardName="질문게시판"
        title={issue.title}
        author={issue.user?.login || '알 수 없음'}
        authorAvatar={issue.user?.avatar_url || ''}
        createdAt={issue.created_at}
        content={issue.body || ''}
        onEdit={handleEdit}
        onDelete={handleDelete}
        boardType="QNA"
      />
    </div>
  );
};

export default QuestionBoardDetail;
