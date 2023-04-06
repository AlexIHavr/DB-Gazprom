import { FC } from 'react';

import NavLinks from './components/navLinks/navLinks.component';
import styles from './navigation.module.scss';

const Navigation: FC = () => {
  return (
    <header>
      <div className={styles.navigation}>
        <NavLinks />
      </div>
    </header>
  );
};

export default Navigation;
