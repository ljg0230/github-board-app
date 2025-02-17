import React from 'react';
import { Helmet } from 'react-helmet-async';
import ImageSlider from '../components/home/ImageSlider';
import BoardList from '../components/home/BoardList';
import { Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
      <Helmet>
        <title>홈</title>
      </Helmet>
      <section className="mb-4">
        <ImageSlider />
      </section>
      
      <section>
        <Row>
          <Col md={6}>
            <BoardList title="질문게시판" type="question" />
          </Col>
          <Col md={6}>
            <BoardList title="자유게시판" type="free" />
          </Col>
        </Row>
      </section>
    </div>
  );
}
