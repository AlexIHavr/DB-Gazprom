import classNames from 'classnames';

import { useAppSelector } from '../../../hooks/redux';
import './preloader.scss';

const Preloader: React.FC = () => {
  const { isLoading } = useAppSelector((store) => store.app);

  return (
    <div>
      <span className={classNames('preloader', { active: isLoading })}>
        <svg viewBox="22 22 44 44">
          <circle cx="44" cy="44" r="20.2" fill="none" strokeWidth="3.6"></circle>
        </svg>
      </span>
    </div>
  );
};

export default Preloader;
