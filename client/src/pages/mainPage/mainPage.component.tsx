import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Navigation } from 'widgets';
import { ModalWindows, Preloader } from 'features';

const MainPage: FC = () => {
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
