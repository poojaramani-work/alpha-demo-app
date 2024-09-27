import { createBrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import Daily from '../pages/Daily';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/daily',
    element: <Daily />,
  },
]);