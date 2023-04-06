import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { PAGES } from 'widgets';

const MainPage = lazy(() => import('./mainPage/mainPage.component'));
const VtdTable = lazy(() => import('./vtdTable/vtdTable.component'));
const VtdTree = lazy(() => import('./vtdTree/vtdTree.component'));

const router = createBrowserRouter([
  {
    path: PAGES.mainPage.path,
    Component: MainPage,
    children: [
      {
        index: true,
        Component: VtdTree,
      },
      {
        path: `${PAGES.vtdTable.path}/:${PAGES.vtdTable.params.vtdId}/:${PAGES.vtdTable.params.tableType}`,
        Component: VtdTable,
      },
    ],
  },
]);

export default router;
