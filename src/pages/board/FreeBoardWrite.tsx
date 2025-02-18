import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardWriteForm from '@/components/board/BoardWriteForm';
import { useCreateIssue } from '@/hooks/useGitHubIssues';
import { Helmet } from 'react-helmet-async';

const FreeBoardWrite: React.FC = () => {
  const navigate = useNavigate();
  const createIssueMutation = useCreateIssue();

  const handleSubmit = async (title: string, content: string) => {
    try {
      const newIssue = await createIssueMutation.mutateAsync({
        boardType: 'FREE',
        title,
        body: content
      });
      if (newIssue && newIssue.number) {
        setTimeout(() => {
          navigate(`/board/free/${newIssue.number}`, { replace: true });
        }, 500);
      }
    } catch (error) {
      console.error('글쓰기 실패:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>글쓰기</title>
      </Helmet>
      <BoardWriteForm boardName="자유게시판" onSubmit={handleSubmit} />
    </>
  );
};

export default FreeBoardWrite;
