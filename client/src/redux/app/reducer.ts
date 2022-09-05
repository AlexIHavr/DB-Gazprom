import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 } from 'uuid';

import { InitialState, ModalWindow } from './types';

const initialState: InitialState = {
  isLoading: false,
  modalWindows: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    addModalWindow: (state, action: PayloadAction<ModalWindow>) => {
      state.modalWindows.push({ id: v4(), ...action.payload });
    },
    removeModalWindow: (state, action: PayloadAction<string>) => {
      state.modalWindows = state.modalWindows.filter(({ id }) => id !== action.payload);
    },
  },
});

export const { setIsLoading, addModalWindow, removeModalWindow } = appSlice.actions;

const appReducer = appSlice.reducer;
export default appReducer;
