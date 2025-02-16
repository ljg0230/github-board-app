import React from 'react';
import ImageSlider from '../components/home/ImageSlider';
import BoardList from '../components/home/BoardList';
import { Row, Col } from 'react-bootstrap';

export default function Home() {
  return (
    <div>
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
