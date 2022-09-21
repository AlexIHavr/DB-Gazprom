import { NavLink } from 'react-router-dom';

import './navigation.scss';

import gazpromLogoSrc from '../../../assets/images/gazpromLogo.png';
import { NAV_LINKS, PAGES } from '../constants';

const Navigation: React.FC = () => {
  return (
    <header>
      <div className="navigation">
        <div className="links">
          {NAV_LINKS.map(({ path, name, params }) =>
            path === PAGES.main.path ? (
              <NavLink key={path} to={path} className="gazpromLogoLink">
                <div className="gazpromLogoBtn">
                  <img className="gazpromLogo" src={gazpromLogoSrc} alt="Image is failed" />
                </div>
              </NavLink>
            ) : (
              !params && (
                <NavLink key={path} to={path}>
                  <button className="btn navBtn">{name}</button>
                </NavLink>
              )
            ),
          )}
        </div>
      </div>
    </header>
  );
};

export default Navigation;
