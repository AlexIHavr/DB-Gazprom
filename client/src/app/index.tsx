import { Navigation } from 'widgets';
import { ModalWindows, Preloader } from 'templates';
import Routing from 'pages';

import './api/interceptors';
import './index.scss';

const App: React.FC = () => {
  return (
    <div className="wrapper">
      <ModalWindows />
      <Preloader />
      <Navigation />
      <Routing />
    </div>
  );
};

export default App;
