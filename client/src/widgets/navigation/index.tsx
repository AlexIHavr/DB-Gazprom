import NavLinks from './components/navLinks/navLinks.component';
import './index.scss';

const Navigation: React.FC = () => {
  return (
    <header>
      <div className="navigation">
        <NavLinks />
      </div>
    </header>
  );
};

export default Navigation;
