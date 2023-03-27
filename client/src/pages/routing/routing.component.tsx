import { FC, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { PAGES } from 'shared';

import useVtdTableStore from '../vtdTable/vtdTable.store';

import useVtdTreeStore from './../vtdTree/vtdTree.store';
import { getVtdTree } from './helpers/getVtdTree';

const VtdTable = lazy(() => import('../vtdTable/vtdTable.component'));
const VtdTree = lazy(() => import('../vtdTree/vtdTree.component'));

const Routing: FC = () => {
  const [vtds, setVtds] = useVtdTableStore((state) => [state.vtds, state.setVtds]);
  const [vtdTree, setVtdTree] = useVtdTreeStore((state) => [state.vtdTree, state.setVtdTree]);

  useEffect(() => {
    if (!vtds.length) {
      setVtds();
    } else if (!vtdTree.length) {
      setVtdTree(getVtdTree(vtds));
    }
  }, [setVtds, setVtdTree, vtdTree.length, vtds]);

  return (
    <div className="content">
      {!!vtdTree.length && (
        <Routes>
          <Route path={PAGES.main.path} element={<VtdTree />} />
          <Route
            path={`${PAGES.vtdTable.path}/:${PAGES.vtdTable.params.vtdId}/:${PAGES.vtdTable.params.tableType}`}
            element={<VtdTable />}
          />
        </Routes>
      )}
    </div>
  );
};

export default Routing;
