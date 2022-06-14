import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState } from './types';

const initialState: InitialState = {
  isLoading: false,
};

export const appSlice = createSlice({
  name: 'vtdTree',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setIsLoading } = appSlice.actions;

const appReducer = appSlice.reducer;
export default appReducer;
