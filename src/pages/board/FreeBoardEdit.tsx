import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BoardWriteForm from '@/components/board/BoardWriteForm';
import { useIssue, useUpdateIssue } from '@/hooks/useGitHubIssues';
import { Helmet } from 'react-helmet-async';
import BoardDetailSkeleton from '@/components/board/skeleton/BoardDetailSkeleton';

const FreeBoardEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: issue, isLoading, isError } = useIssue('FREE', Number(id));
  const updateIssueMutation = useUpdateIssue();

  const handleSubmit = async (title: string, content: string) => {
    try {
      const result = await updateIssueMutation.mutateAsync({
        boardType: 'FREE',
        issueNumber: Number(id),
        title,
        body: content,
      });
      if (result) {
        setTimeout(() => {
          navigate(`/board/free/${id}`);
        }, 500);
      }
    } catch (error) {
      console.error('수정 실패:', error);
    }
  };

  if (isLoading) {
    return <BoardDetailSkeleton />;
  }

  if (isError || !issue) {
    return <div>게시글을 불러오는데 실패했습니다.</div>;
  }


  return (
    <>
      <Helmet>
        <title>{issue.title}</title>
      </Helmet>
      <BoardWriteForm 
        boardName="자유게시판" 
        onSubmit={handleSubmit}
        initialTitle={issue.title}
        initialContent={issue.body || ''}
      />
    </>
  );
};

export default FreeBoardEdit;