import { FC } from 'react';

import usePreloaderStore from './preloader.store';
import './preloader.styles.scss';

const Preloader: FC = () => {
  const isLoading = usePreloaderStore((state) => state.isLoading);

  return <>{isLoading && <span className="preloader"></span>}</>;
};

export default Preloader;
