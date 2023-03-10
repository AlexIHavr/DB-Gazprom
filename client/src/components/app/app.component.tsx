import ModalWindows from './modalWindows/modalWindows.component';
import Preloader from './preloader/preloader.component';
import Navigation from './navigation/navigation.component';
import Pages from './pages/pages.component';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <ModalWindows />
      <Preloader />
      <Navigation />
      <Pages />
    </div>
  );
};

export default App;
