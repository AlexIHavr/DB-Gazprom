import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from 'app';

import { store } from './redux/store';

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <Provider store={store}>
      <Suspense>
        <App />
      </Suspense>
    </Provider>
  </BrowserRouter>,
);
