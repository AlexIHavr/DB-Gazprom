import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from 'widgets';
import { ModalWindows, Preloader } from 'features';

import useVtdTreeStore from '../vtdTree/vtdTree.store';

const MainPage: FC = () => {
  const setVtds = useVtdTreeStore((state) => state.setVtds);

  useEffect(() => {
    setVtds();
  }, [setVtds]);

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
