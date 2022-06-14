import { useRoutes } from 'react-router-dom';

import { PAGES } from '../constants';

import LoadVtd from './loadVtd/LoadVtd';
import VtdForm from './vtdForm/VtdForm';
import VtdTree from './vtdTree/VtdTree';

const Content: React.FC = () => {
  const routes = useRoutes([
    { path: PAGES.main.path, element: <VtdTree /> },
    { path: PAGES.loadVtd.path, element: <LoadVtd /> },
    { path: `${PAGES.vtdForm.path}/:${PAGES.vtdForm.param}`, element: <VtdForm /> },
  ]);

  return <div className="content">{routes}</div>;
};

export default Content;
