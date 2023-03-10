import classNames from 'classnames';
import { useAppSelector } from 'hooks/redux';

import './preloader.styles.scss';

const Preloader: React.FC = () => {
  const { isLoading } = useAppSelector((store) => store.app);

  return <span className={classNames('preloader', { active: isLoading })}></span>;
};

export default Preloader;
