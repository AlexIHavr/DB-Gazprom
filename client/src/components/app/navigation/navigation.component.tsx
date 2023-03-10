import { NavLink } from 'react-router-dom';
import gazpromLogoSrc from 'assets/images/gazpromLogo.png';

import { PAGES } from '../app.constants';
import './navigation.styles.scss';

const Navigation: React.FC = () => {
  return (
    <header>
      <div className="navigation">
        <div className="links">
          <NavLink to={PAGES.main.path} className="gazpromLogoLink">
            <div className="gazpromLogoBtn">
              <img className="gazpromLogo" src={gazpromLogoSrc} alt="Image is failed" />
            </div>
          </NavLink>
          <NavLink to={PAGES.guides.path}>
            <button className="btn navBtn">Справочники</button>
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
