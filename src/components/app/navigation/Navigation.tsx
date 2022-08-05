import { NavLink } from 'react-router-dom';
import { AppBar, Box, Button, Toolbar } from '@mui/material';

import './navigation.scss';

import gazpromLogoSrc from '../../../assets/images/gazpromLogo.png';
import { NAV_LINKS, PAGES } from '../constants';

const Navigation: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar className="navigation">
        <Box className="links">
          {NAV_LINKS.map(({ path, name, param }) =>
            path === PAGES.main.path ? (
              <NavLink key={path} to={path} className="gazpromLogoLink">
                <Button className="gazpromLogoBtn">
                  <img className="gazpromLogo" src={gazpromLogoSrc} alt="Image is failed" />
                </Button>
              </NavLink>
            ) : (
              !param && (
                <NavLink key={path} to={path}>
                  <Button color="inherit" variant="outlined" size="large">
                    {name}
                  </Button>
                </NavLink>
              )
            ),
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
