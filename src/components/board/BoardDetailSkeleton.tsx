import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Stack, Button } from 'react-bootstrap';

const BoardDetailSkeleton: React.FC = () => {
  return (
    <div>
      <h2 className="mb-4">
        <Skeleton width={200} />
      </h2>
      <div className="border-bottom pb-3 mb-3">
        <h3 className="mb-3">
          <Skeleton width="60%" />
        </h3>
        <div className="text-muted d-flex align-items-center">
          <Skeleton circle width={24} height={24} style={{ marginRight: '8px' }} />
          <Skeleton width={80} />
          <Skeleton width={100} style={{ marginLeft: '8px' }} />
        </div>
      </div>
      <div className="mb-4" style={{ minHeight: '200px' }}>
        <Skeleton count={5} />
      </div>
      <Stack direction="horizontal" gap={2} className="justify-content-end">
        <Button variant="secondary" disabled>
          <Skeleton width={50} />
        </Button>
        <Button variant="secondary" disabled>
          <Skeleton width={50} />
        </Button>
        <Button variant="primary" disabled>
          <Skeleton width={50} />
        </Button>
      </Stack>
    </div>
  );
};

export default BoardDetailSkeleton;
