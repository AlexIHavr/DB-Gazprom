import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { getVtdTree } from '../../../helpers/vtdTree';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { setVtdTree } from '../../../redux/vtds/reducer';
import { getVtds } from '../../../redux/vtds/thunks';
import { PAGES } from '../constants';

import LoadVtd from './loadVtd/LoadVtd';
import VtdForm from './vtdForm/VtdForm';
import Vtds from './vtdTree/VtdTree';

const Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vtds, vtdTree } = useAppSelector((state) => state.vtds);

  const routes = useRoutes([
    { path: PAGES.main.path, element: <Vtds /> },
    { path: `${PAGES.loadVtd.path}/:${PAGES.loadVtd.param}`, element: <LoadVtd /> },
    { path: `${PAGES.vtdForm.path}/:${PAGES.vtdForm.param}`, element: <VtdForm /> },
  ]);

  useEffect(() => {
    if (!vtds.length) {
      dispatch(getVtds());
    } else if (!vtdTree.length) {
      dispatch(setVtdTree(getVtdTree(vtds)));
    }
  }, [dispatch, vtdTree.length, vtds]);

  return <div className="content">{routes}</div>;
};

export default Content;
