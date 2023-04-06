import { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from 'pages';

import './api/interceptors';
import './index.scss';

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
