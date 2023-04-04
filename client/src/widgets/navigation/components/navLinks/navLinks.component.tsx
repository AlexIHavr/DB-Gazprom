import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { PAGES } from 'shared/consts/pages';

import gazpromLogo from '../../assets/gazpromLogo.png';
import './navLinks.styles.scss';

const NavLinks: FC = () => {
  return (
    <div className="navLinks">
      <NavLink to={PAGES.main.path} className="gazpromLogoLink">
        <div className="gazpromLogoBtn">
          <img className="gazpromLogo" src={gazpromLogo} alt="Image is failed" />
        </div>
      </NavLink>

      <NavLink to={PAGES.guides.path}>
        <button className="btn navBtn">Справочники</button>
      </NavLink>
    </div>
  );
};

export default NavLinks;
