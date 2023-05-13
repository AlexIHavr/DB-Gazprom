import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from 'widgets';
import { ModalWindows, Preloader } from 'features';

import useVtdTreeStore from '../vtdTree/vtdTree.store';

import { getVtdTree } from './../vtdTree/helpers/getVtdTree';

const MainPage: FC = () => {
  const [vtds, vtdTree, setVtdTree, setVtds] = useVtdTreeStore((state) => [
    state.vtds,
    state.vtdTree,
    state.setVtdTree,
    state.setVtds,
  ]);

  useEffect(() => {
    if (!vtds.length) setVtds();
    else if (!vtdTree.length) setVtdTree(getVtdTree(vtds));
  }, [setVtdTree, setVtds, vtdTree.length, vtds]);

  return (
    <div>
      <ModalWindows />
      <Preloader />
      <Navigation />
      <Outlet />
    </div>
  );
};

export default MainPage;
