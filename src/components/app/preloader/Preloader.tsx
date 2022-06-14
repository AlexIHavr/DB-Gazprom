import { CircularProgress } from '@mui/material';
import classNames from 'classnames';

import { useAppSelector } from '../../../hooks/redux';
import './preloader.scss';

const Preloader: React.FC = () => {
  const { isLoading } = useAppSelector((store) => store.app);

  return <CircularProgress className={classNames('preloader-wrapper', { active: isLoading })} />;
};

export default Preloader;
