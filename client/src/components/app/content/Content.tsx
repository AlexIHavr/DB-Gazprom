import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { getVtdTree } from '../../../helpers/vtdTree';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setVtdTree } from '../../../redux/vtds/reducer';
import { getVtds } from '../../../redux/vtds/thunks';
import { PAGES } from '../constants';

import VtdTable from './vtdTable/VtdTable';
import Vtds from './vtdTree/VtdTree';

const Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vtds, vtdTree } = useAppSelector((state) => state.vtds);

  const routes = useRoutes([
    { path: PAGES.main.path, element: <Vtds /> },
    { path: `${PAGES.vtdTable.path}/:${PAGES.vtdTable.params.vtdId}/:${PAGES.vtdTable.params.tableType}`, element: <VtdTable /> },
  ]);

  useEffect(() => {
    if (!vtds.length) {
      dispatch(getVtds());
    } else if (!vtdTree.length) {
      dispatch(setVtdTree(getVtdTree(vtds)));
    }
  }, [dispatch, vtdTree.length, vtds]);

  return <div className="content">{vtdTree.length ? routes : ''}</div>;
};

export default Content;
