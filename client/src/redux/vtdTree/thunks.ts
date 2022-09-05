import { createAsyncThunk } from '@reduxjs/toolkit';

import { excelRenderer } from '../../helpers/excel';
import { setIsLoading } from '../app/reducer';

import { vtdApi } from './../../api/api';
import { GetVtdTreeResponse, GetPipelineTable, TableType, PipelineTable } from './types';

export const setPipelineTable = createAsyncThunk<
  void,
  { vtdId: string; file: File; tableType: TableType },
  { rejectValue: string }
>('setPipelineTable', async ({ vtdId, file, tableType }, { dispatch, rejectWithValue }) => {
  dispatch(setIsLoading(true));

  try {
    const pipelineTable = await excelRenderer(file);
    await vtdApi.put('/setPipelineTable', { id: vtdId, pipelineTable, tableType });
  } catch (err) {
    return rejectWithValue((err as Error).message);
  } finally {
    dispatch(setIsLoading(false));
  }
});

export const getVtdTree = createAsyncThunk<GetVtdTreeResponse>('getVtdTree', async () => {
  const { data } = await vtdApi.get<GetVtdTreeResponse>('/getVtdTree');
  return data;
});

export const getPipelineTable = createAsyncThunk<GetPipelineTable, { vtdId: string; tableType: TableType }>(
  'getPipelineTable',
  async ({ vtdId, tableType }) => {
    const { data } = await vtdApi.get<PipelineTable>('/getPipelineTable', { params: { id: vtdId, tableType } });
    return { vtdId, pipelineTable: data, tableType };
  },
);
