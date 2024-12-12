import { createBrowserRouter } from 'react-router-dom';
import { Home } from '../components/Home/Home';
import { SceneViewer } from '../components/SceneViewer/SceneViewer';
import { CategoryView } from '../components/CategoryView/CategoryView';
import { SearchResults } from '../components/Search/SearchResults';
import { Layout } from '../components/Layout/Layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'category/:category',
        element: <CategoryView />,
      },
      {
        path: 'search',
        element: <SearchResults />,
      },
      {
        path: ':fanName',
        element: <SceneViewer />,
      },
    ],
  },
]);