import { FC, lazy, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setVtdTree } from 'redux/vtds/reducer';
import { getVtds } from 'redux/vtds/thunks';
import { PAGES } from 'shared';

import { getVtdTree } from './routing.consts';

const VtdTable = lazy(() => import('../vtdTable/vtdTable.component'));
const VtdTree = lazy(() => import('../vtdTree/vtdTree.component'));

const Routing: FC = () => {
  const dispatch = useAppDispatch();
  const { vtds, vtdTree } = useAppSelector((state) => state.vtds);

  useEffect(() => {
    if (!vtds.length) {
      dispatch(getVtds());
    } else if (!vtdTree.length) {
      dispatch(setVtdTree(getVtdTree(vtds)));
    }
  }, [dispatch, vtdTree.length, vtds]);

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
