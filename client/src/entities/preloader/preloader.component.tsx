import { FC } from 'react';
import { useAppSelector } from 'hooks/redux';

import './preloader.styles.scss';

const Preloader: FC = () => {
  const { isLoading } = useAppSelector((store) => store.app);

  return <>{isLoading && <span className="preloader"></span>}</>;
};

export default Preloader;
