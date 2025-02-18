import React from 'react';
import BoardWriteForm from '@/components/board/BoardWriteForm';

const QuestionBoardWrite: React.FC = () => {
  const handleSubmit = async (title: string, content: string) => {
    // GitHub Issue 생성 로직 구현 예정
    console.log('질문게시판 글쓰기:', { title, content });
  };

  return <BoardWriteForm boardName="질문게시판" onSubmit={handleSubmit} />;
};

export default QuestionBoardWrite;
