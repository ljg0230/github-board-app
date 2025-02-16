import React from 'react';
import { Link } from 'react-router-dom';

interface BoardListProps {
  title: string;
  type: 'question' | 'free';
}

const BoardList: React.FC<BoardListProps> = ({ title, type }) => {
  return (
    <div className="board-list">
      <h3 className="mb-3">
        <Link to={`/board/${type}`}>{title}</Link>
      </h3>
      <ul className="list-unstyled">
        <li className="mb-2 d-flex justify-content-between">
          <span>무궁화 꽃이 피었습니다. 무궁화 꽃이 피...</span>
          <small>12/12 00:00</small>
        </li>
        <li className="mb-2 d-flex justify-content-between">
          <span>무궁화 꽃이 피었습니다. 무궁화 꽃이 피...</span>
          <small>12/12 00:00</small>
        </li>
        <li className="mb-2 d-flex justify-content-between">
          <span>무궁화 꽃이 피었습니다. 무궁화 꽃이 피...</span>
          <small>12/12 00:00</small>
        </li>
      </ul>
    </div>
  );
};

export default BoardList; 