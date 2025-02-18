import React from 'react';
import { Link } from 'react-router-dom';
import { Issue } from '@/api/config';
import { formatDateOrTimeIfToday } from '@/utils/dateFormat';

interface BoardListProps {
  title: string;
  type: 'question' | 'free';
  issues?: Issue[];
}

const BoardList: React.FC<BoardListProps> = ({ title, type, issues }) => {
  return (
    <div className="board-list">
      <h3 className="mb-3">
        <Link to={`/board/${type}`}>{title}</Link>
      </h3>
      <div
        className="p-3 border rounded d-flex align-items-center justify-content-center"
        style={{ minHeight: '200px', borderColor: '#ddd' }}
      >
        {issues && issues.length > 0 ? (
          <ul className="list-unstyled w-100">
            {issues.map((issue) => (
              <li
                key={issue.number}
                className="mb-2 d-flex justify-content-between align-items-center"
              >
                <Link
                  to={`/board/${type}/${issue.number}`}
                  className="text-truncate"
                  style={{ flex: '1 1 auto', marginRight: '10px' }}
                >
                  <span>{issue.title}</span>
                </Link>
                <small style={{ flex: '0 0 auto', textAlign: 'right' }}>
                  {formatDateOrTimeIfToday(issue.created_at)}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-muted">
            등록된 게시글이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardList;
