import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BoardDetail from '@/components/board/BoardDetail';
import { useModal } from '@/contexts/ModalContext';

const QuestionBoardDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { confirm } = useModal();

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

  return (
    <BoardDetail
      boardName="질문게시판"
      title="무궁화 꽃이 피었습니다."
      author="홍길동"
      authorAvatar=""
      createdAt="2023-06-01 00:00:00"
      content="내용 내용 내용..."
      onEdit={handleEdit}
      onDelete={handleDelete}
      boardType="QNA"
    />
  );
};

export default QuestionBoardDetail; 