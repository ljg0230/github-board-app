import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Table } from 'react-bootstrap';

const BoardTableSkeleton: React.FC = () => {
  return (
    <Table striped bordered hover>
      <thead>
      <tr className="text-center">
          <th style={{ width: '8%' }}>번호</th>
          <th style={{ width: '62%' }}>제목</th>
          <th style={{ width: '15%' }}>작성자</th>
          <th style={{ width: '15%' }}>작성일</th>
        </tr>
      </thead>
      <tbody>
        {Array(10).fill(0).map((_, index) => (
          <tr key={index}>
            <td className="text-center">
              <Skeleton width={30} />
            </td>
            <td>
              <Skeleton width="90%" />
            </td>
            <td className="text-center">
              <div className="d-flex align-items-center justify-content-center">
                <Skeleton circle width={24} height={24} style={{ marginRight: '8px' }} />
                <Skeleton width={80} />
              </div>
            </td>
            <td className="text-center">
              <Skeleton width={100} />
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default BoardTableSkeleton; 