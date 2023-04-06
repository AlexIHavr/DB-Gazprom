import { FC } from 'react';

import usePreloaderStore from './preloader.store';
import styles from './preloader.module.scss';

const Preloader: FC = () => {
  const isLoading = usePreloaderStore((state) => state.isLoading);

  return <>{isLoading && <span className={styles.preloader}></span>}</>;
};

export default Preloader;
