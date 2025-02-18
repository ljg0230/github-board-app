import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const BoardListSkeleton: React.FC = () => {
  return (
    <div className="board-list">
      <h3 className="mb-3">
        <Skeleton width={150} />
      </h3>
      <div
        className="p-3 border rounded"
        style={{ minHeight: '200px', borderColor: '#ddd' }}
      >
        <ul className="list-unstyled">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className="mb-2 d-flex justify-content-between align-items-center"
              >
                <div style={{ flex: '1 1 auto', marginRight: '25px' }}>
                  <Skeleton width="100%" />
                </div>
                <Skeleton width={100} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default BoardListSkeleton;
