import classNames from 'classnames';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import globalStyles from 'shared/styles/global.module.scss';

import { PAGES } from '../../consts/pages';
import gazpromLogo from '../../assets/gazpromLogo.png';

import styles from './navLinks.module.scss';

const NavLinks: FC = () => {
  return (
    <div className={styles.navLinks}>
      <NavLink to={PAGES.mainPage.path} className={styles.gazpromLogoLink}>
        <div className={styles.gazpromLogoBtn}>
          <img className={styles.gazpromLogo} src={gazpromLogo} alt="Image is failed" />
        </div>
      </NavLink>

      <NavLink to={PAGES.guides.path} className={({ isActive }) => classNames({ [styles.active]: isActive })}>
        <button className={classNames(globalStyles.btn, styles.navBtn)}>Справочники</button>
      </NavLink>
    </div>
  );
};

export default NavLinks;
