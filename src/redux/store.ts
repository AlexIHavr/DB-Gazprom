import { configureStore } from '@reduxjs/toolkit';

import appReducer from './app/reducer';
import vtdDataReducer from './vtdData/reducer';
import vtdTreeReducer from './vtdTree/reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    vtdTree: vtdTreeReducer,
    vtdData: vtdDataReducer,
  },
});

export type Dispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
