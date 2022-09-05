import Content from './content/Content';
import ModalWindows from './modalWindows/ModalWindows';
import Navigation from './navigation/Navigation';
import Preloader from './preloader/Preloader';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <ModalWindows />
      <Preloader />
      <Navigation />
      <Content />
    </div>
  );
};

export default App;
