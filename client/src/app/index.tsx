import { Navigation } from 'widgets';
import Routing from 'pages';

import { ModalWindows, Preloader } from '../entities';
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
