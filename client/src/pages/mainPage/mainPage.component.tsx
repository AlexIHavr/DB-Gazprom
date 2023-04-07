import { FC, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from 'widgets';
import { ModalWindows, Preloader } from 'features';

import useVtdTableStore from '../vtdTable/vtdTable.store';

const MainPage: FC = () => {
  const setVtds = useVtdTableStore((state) => state.setVtds);

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
