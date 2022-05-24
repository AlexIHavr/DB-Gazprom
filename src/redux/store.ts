import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {},
});

export type Dispatch = typeof store.dispatch;
export type Store = ReturnType<typeof store.getState>;
