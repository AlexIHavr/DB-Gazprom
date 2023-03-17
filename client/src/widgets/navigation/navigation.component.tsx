import NavLinks from './components/navLinks/navLinks.component';
import './navigation.styles.scss';

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
