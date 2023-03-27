import { configureStore } from '@reduxjs/toolkit';

import vtdsReducer from './vtds/reducer';

export const store = configureStore({
  reducer: {
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
