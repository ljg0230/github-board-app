import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import QuestionBoard from '../pages/board/QuestionBoard';
import FreeBoard from '../pages/board/FreeBoard';
import FreeBoardWrite from '../pages/board/FreeBoardWrite';
import QuestionBoardWrite from '../pages/board/QuestionBoardWrite';
import FreeBoardDetail from '../pages/board/FreeBoardDetail';
import QuestionBoardDetail from '@/pages/board/QuestionBoardDetail';
import FreeBoardEdit from '@/pages/board/FreeBoardEdit';
import QuestionBoardEdit from '@/pages/board/QuestionBoardEdit';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'board',
        children: [
          {
            path: 'qna',
            children: [
              {
                index: true,
                element: <QuestionBoard />
              },
              {
                path: 'write',
                element: <QuestionBoardWrite />
              },
              {
                path: ':id',
                element: <QuestionBoardDetail />
              },
              {
                path: ':id/edit',
                element: <QuestionBoardEdit />
              }
            ]
          },
          {
            path: 'free',
            children: [
              {
                index: true,
                element: <FreeBoard />
              },
              {
                path: 'write',
                element: <FreeBoardWrite />
              },
              {
                path: ':id',
                element: <FreeBoardDetail />
              },
              {
                path: ':id/edit',
                element: <FreeBoardEdit />
              }
            ]
          }
        ]
      }
    ]
  }
]);
