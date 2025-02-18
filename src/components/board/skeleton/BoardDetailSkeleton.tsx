import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Stack, Button, Row, Col } from 'react-bootstrap';

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
          <Skeleton
            circle
            width={24}
            height={24}
            style={{ marginRight: '8px' }}
          />
          <Skeleton width={80} />
          <Skeleton width={100} style={{ marginLeft: '8px' }} />
        </div>
      </div>
      <div className="mb-4" style={{ minHeight: '300px' }}>
        <Skeleton count={5} />
      </div>
      <Row className="justify-content-between">
        <Col>
          <Stack direction="horizontal" gap={2}>
            <Button variant="secondary" disabled>
              <Skeleton width={50} />
            </Button>
            <Button variant="secondary" disabled>
              <Skeleton width={50} />
            </Button>
          </Stack>
        </Col>
        <Col className="text-end">
          <Button variant="primary" disabled>
            <Skeleton width={50} />
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default BoardDetailSkeleton;
