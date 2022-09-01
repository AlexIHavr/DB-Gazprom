import Content from './content/Content';
import Navigation from './navigation/Navigation';
import Preloader from './preloader/Preloader';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <Preloader />
      <Navigation />
      <Content />
    </div>
  );
};

export default App;
