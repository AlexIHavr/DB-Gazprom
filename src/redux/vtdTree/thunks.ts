import { createAsyncThunk } from '@reduxjs/toolkit';

import { excelRenderer } from '../../helpers/excel';
import { setIsLoading } from '../app/reducer';

import { SetPipelinesDataParams } from './types';

export const setPipelinesData = createAsyncThunk<SetPipelinesDataParams, { vtdId: string; file: File }, { rejectValue: string }>(
  'setPipelinesData',
  async ({ vtdId, file }, { dispatch, rejectWithValue }) => {
    dispatch(setIsLoading(true));

    try {
      const data = await excelRenderer(file);
      return { vtdId, data: { form: data } };
    } catch (err) {
      const thunkErr = err as Error;
      return rejectWithValue(thunkErr.message);
    } finally {
      dispatch(setIsLoading(false));
    }
  },
);
