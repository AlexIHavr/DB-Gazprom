import { useEffect } from 'react';
import { getVtdTree } from 'helpers/vtdTree';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { setVtdTree } from 'redux/vtds/reducer';
import { getVtds } from 'redux/vtds/thunks';

import AppRoutes from './pages.routes';

const Pages: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vtds, vtdTree } = useAppSelector((state) => state.vtds);

  useEffect(() => {
    if (!vtds.length) {
      dispatch(getVtds());
    } else if (!vtdTree.length) {
      dispatch(setVtdTree(getVtdTree(vtds)));
    }
  }, [dispatch, vtdTree.length, vtds]);

  return <div className="content">{vtdTree.length ? <AppRoutes></AppRoutes> : ''}</div>;
};

export default Pages;
