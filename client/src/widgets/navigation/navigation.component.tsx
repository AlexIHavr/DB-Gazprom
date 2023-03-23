import { FC } from 'react';

import NavLinks from './components/navLinks/navLinks.component';
import './navigation.styles.scss';

const Navigation: FC = () => {
  return (
    <header>
      <div className="navigation">
        <NavLinks />
      </div>
    </header>
  );
};

export default Navigation;
