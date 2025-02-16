import React from 'react';
import { useNavigate } from 'react-router-dom';
import BoardWriteForm from '@/components/board/BoardWriteForm';
import { createIssue } from '@/api/github';
import { useModal } from '@/contexts/ModalContext';

const FreeBoardWrite: React.FC = () => {
  const navigate = useNavigate();
  const { alert } = useModal();

  const handleSubmit = async (title: string, content: string) => {
    try {
      await createIssue('FREE', title, content);
      await alert('게시글이 등록되었습니다.');
      navigate('/board/free');
    } catch (error) {
      console.error('글쓰기 실패:', error);
      await alert('게시글 등록에 실패했습니다.');
    }
  };

  return (
    <BoardWriteForm 
      boardName="자유게시판" 
      onSubmit={handleSubmit}
    />
  );
};

export default FreeBoardWrite; 