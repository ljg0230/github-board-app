import React from 'react';
import { useQuery } from '@tanstack/react-query';
import ImageSlider from '../components/home/ImageSlider';
import BoardList from '../components/home/BoardList';
import BoardListSkeleton from '../components/board/skeleton/BoardListSkeleton';
import { Row, Col } from 'react-bootstrap';
import { getIssueList } from '@/api/github';
import { Helmet } from 'react-helmet-async';

export default function Home() {
  const {
    data: freeBoardData,
    isLoading: isFreeBoardLoading,
    isError: isFreeBoardError,
  } = useQuery({
    queryKey: ['issues', 'free'],
    queryFn: () => getIssueList('FREE', 1),
    select: (data) => data.issues.slice(0, 5),
  });

  const {
    data: questionBoardData,
    isLoading: isQuestionBoardLoading,
    isError: isQuestionBoardError,
  } = useQuery({
    queryKey: ['issues', 'question'],
    queryFn: () => getIssueList('QNA', 1),
    select: (data) => data.issues.slice(0, 5),
  });

  return (
    <div>
      <Helmet>
        <title>홈</title>
      </Helmet>
      <section className="mb-4">
        <ImageSlider />
      </section>

      <section>
        <Row className="gx-5 gy-4">
          <Col md={6}>
            {isQuestionBoardLoading && <BoardListSkeleton />}
            {isQuestionBoardError && (
              <div>데이터를 불러오는데 실패했습니다.</div>
            )}
            {questionBoardData && (
              <BoardList
                title="질문게시판"
                type="question"
                issues={questionBoardData}
              />
            )}
          </Col>
          <Col md={6}>
            {isFreeBoardLoading && <BoardListSkeleton />}
            {isFreeBoardError && <div>데이터를 불러오는데 실패했습니다.</div>}
            {freeBoardData && (
              <BoardList
                title="자유게시판"
                type="free"
                issues={freeBoardData}
              />
            )}
          </Col>
        </Row>
      </section>
    </div>
  );
}
