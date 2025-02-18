import React from 'react';
import { Pagination, Stack } from 'react-bootstrap';

interface BoardPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const BoardPagination: React.FC<BoardPaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange
}) => {
  const pageGroupSize = 10;
  const currentGroup = Math.floor((currentPage - 1) / pageGroupSize);
  const startPage = currentGroup * pageGroupSize + 1;
  const endPage = Math.min(startPage + pageGroupSize - 1, totalPages);

  const pageNumbers = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  ).filter((pageNum) => pageNum <= totalPages);

  return (
    <Stack direction="horizontal" className="justify-content-center mt-5">
      <Pagination>
        {/* 첫 페이지로 이동 */}
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />

        {/* 이전 10개 페이지로 이동 */}
        <Pagination.Prev
          onClick={() => onPageChange(Math.max(1, startPage - pageGroupSize))}
          disabled={startPage === 1}
        />

        {pageNumbers.map((pageNum) => (
          <Pagination.Item
            key={pageNum}
            active={pageNum === currentPage}
            onClick={() => onPageChange(pageNum)}
          >
            {pageNum}
          </Pagination.Item>
        ))}

        {/* 다음 10개 페이지로 이동 */}
        <Pagination.Next
          onClick={() => onPageChange(Math.min(totalPages, endPage + 1))}
          disabled={endPage === totalPages}
        />

        {/* 마지막 페이지로 이동 */}
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </Stack>
  );
};

export default BoardPagination;
