import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, OneVtdData } from './types';

const initialState: InitialState = {
  vtdData: {},
};

export const vtdDataSlice = createSlice({
  name: 'vtdTree',
  initialState,
  reducers: {
    setVtdData: (state, action: PayloadAction<{ id: string; data: OneVtdData }>) => {
      state.vtdData[action.payload.id] = action.payload.data;
    },
  },
});

export const { setVtdData } = vtdDataSlice.actions;

const vtdDataReducer = vtdDataSlice.reducer;
export default vtdDataReducer;
