import { useAppSelector } from 'hooks/redux';

import './index.scss';

const Preloader: React.FC = () => {
  const { isLoading } = useAppSelector((store) => store.app);

  return <>{isLoading && <span className="preloader"></span>}</>;
};

export default Preloader;
