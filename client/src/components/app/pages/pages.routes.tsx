import { Route, Routes } from 'react-router-dom';

import { PAGES } from '../app.constants';

import VtdTable from './vtdTable/vtdTable.component';
import VtdTree from './vtdTree/vtdTree.component';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path={PAGES.main.path} element={<VtdTree />} />
      <Route
        path={`${PAGES.vtdTable.path}/:${PAGES.vtdTable.params.vtdId}/:${PAGES.vtdTable.params.tableType}`}
        element={<VtdTable />}
      />
    </Routes>
  );
};

export default AppRoutes;
