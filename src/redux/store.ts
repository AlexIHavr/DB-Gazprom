import { configureStore } from '@reduxjs/toolkit';

import appReducer from './app/reducer';
import vtdTreeReducer from './vtdTree/reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    vtdTree: vtdTreeReducer,
  },
});

export type Dispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
