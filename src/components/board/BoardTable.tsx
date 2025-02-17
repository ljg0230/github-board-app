import React from 'react';
import { Table, Image } from 'react-bootstrap';
import { Issue } from '@/api/config';
import { formatDateTime } from '@/utils/dateFormat';

interface BoardTableProps {
  posts: Issue[];
  onPostClick?: (postId: number) => void;
}

const BoardTable: React.FC<BoardTableProps> = ({ posts, onPostClick }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr className="text-center">
          <th style={{ width: '8%' }}>번호</th>
          <th style={{ width: '60%' }}>제목</th>
          <th style={{ width: '13%' }}>작성자</th>
          <th style={{ width: '19%' }}>작성일</th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post) => (
            <tr 
              key={post.number} 
              onClick={() => onPostClick?.(post.number)}
              style={{ cursor: onPostClick ? 'pointer' : 'default' }}
            >
              <td className="text-center">{post.number}</td>
              <td>{post.title}</td>
              <td className="text-center">
                <div className="d-flex align-items-center justify-content-center">
                  <Image 
                    src={post.user.avatar_url} 
                    roundedCircle 
                    style={{ 
                      width: '24px', 
                      height: '24px',
                      marginRight: '8px'
                    }} 
                  />
                  {post.user.login}
                </div>
              </td>
              <td className="text-center">
                {formatDateTime(post.created_at)}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-4">
              등록된 게시글이 없습니다
            </td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default BoardTable; 