import React from 'react';
import { Button, Stack, Row, Col } from 'react-bootstrap';
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
  boardType: 'FREE' | 'QNA';
}

const BoardDetail: React.FC<BoardDetailProps> = ({
  boardName,
  title,
  author,
  authorAvatar,
  createdAt,
  content,
  onEdit,
  onDelete,
  boardType
}) => {
  const navigate = useNavigate();

  const handleListClick = () => {
    const path = boardType === 'FREE' ? '/board/free' : '/board/qna';
    navigate(path);
  };

  return (
    <div className="boad-detail-container">
      <h2 className="mb-4">{boardName}</h2>
      <div className="boad-detail-head border-bottom pb-3 mb-3">
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
      <div className="boad-detail-contents mb-4 border-bottom" style={{ minHeight: '300px' }}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      <Row className="justify-content-between boad-detail-bottom">
        <Col>
          <Stack direction="horizontal" gap={2}>
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
          </Stack>
        </Col>
        <Col className="text-end">
          <Button variant="primary" onClick={handleListClick}>
            목록
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BoardDetail;