import React, { useState } from 'react';
import { Form, Button, Stack } from 'react-bootstrap';

interface BoardSearchFormProps {
  onSearch: (searchType: string, keyword: string) => void;
  onWrite: () => void;
}

const BoardSearchForm: React.FC<BoardSearchFormProps> = ({ onSearch, onWrite }) => {
  const [searchType, setSearchType] = useState('제목');
  const [keyword, setKeyword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchType, keyword);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Stack direction="horizontal" gap={2}>
        <Form.Select 
          value={searchType}
          onChange={(e) => setSearchType(e.target.value)}
          style={{ width: '120px' }}
        >
          <option value="제목">제목</option>
          <option value="내용">내용</option>
        </Form.Select>

        <Form.Control
          type="text"
          placeholder="검색어를 입력하세요"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ maxWidth: '300px' }}
        />

        <Button type="submit" variant="secondary">검색</Button>
        <Button variant="primary" onClick={onWrite} className="ms-auto">글쓰기</Button>
      </Stack>
    </Form>
  );
};

export default BoardSearchForm; 