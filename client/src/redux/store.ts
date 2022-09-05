import { configureStore } from '@reduxjs/toolkit';

import appReducer from './app/reducer';
import vtdsReducer from './vtds/reducer';

export const store = configureStore({
  reducer: {
    app: appReducer,
    vtds: vtdsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type Dispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
