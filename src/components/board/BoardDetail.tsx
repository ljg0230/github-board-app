import React from 'react';
import { Button, Stack } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { formatDateTime } from '@/utils/dateFormat';

interface BoardDetailProps {
  boardName: string;
  title: string;
  author: string;
  authorAvatar: string;
  createdAt: string;
  content: string;
  onEdit?: () => void;
  onDelete?: () => void;
}

const BoardDetail: React.FC<BoardDetailProps> = ({
  boardName,
  title,
  author,
  authorAvatar,
  createdAt,
  content,
  onEdit,
  onDelete
}) => {
  const navigate = useNavigate();

  return (
    <div>
      <h2 className="mb-4">{boardName}</h2>
      <div className="border-bottom pb-3 mb-3">
        <h3 className="mb-3">{title}</h3>
        <div className="text-muted d-flex align-items-center">
          <img 
            src={authorAvatar} 
            alt={author} 
            style={{ 
              width: '24px', 
              height: '24px', 
              borderRadius: '50%',
              marginRight: '8px'
            }} 
          />
          <span className="me-2">{author}</span>
          <span>{formatDateTime(createdAt)}</span>
        </div>
      </div>
      <div className="mb-4" style={{ minHeight: '200px' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <Stack direction="horizontal" gap={2} className="justify-content-end">
        {onEdit && (
          <Button variant="secondary" onClick={onEdit}>
            수정
          </Button>
        )}
        {onDelete && (
          <Button variant="secondary" onClick={onDelete}>
            삭제
          </Button>
        )}
        <Button variant="primary" onClick={() => navigate(-1)}>
          목록
        </Button>
      </Stack>
    </div>
  );
};

export default BoardDetail; 