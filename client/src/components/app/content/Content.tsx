import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { getVtdTree } from '../../../redux/vtdTree/thunks';
import { PAGES } from '../constants';

import LoadVtd from './loadVtd/LoadVtd';
import VtdForm from './vtdForm/VtdForm';
import VtdTree from './vtdTree/VtdTree';

const Content: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const routes = useRoutes([
    { path: PAGES.main.path, element: <VtdTree /> },
    { path: PAGES.loadVtd.path, element: <LoadVtd /> },
    { path: `${PAGES.vtdForm.path}/:${PAGES.vtdForm.param}`, element: <VtdForm /> },
  ]);

  useEffect(() => {
    if (!vtdTree.length) dispatch(getVtdTree());
  }, [dispatch, vtdTree.length]);

  return <div className="content">{routes}</div>;
};

export default Content;
