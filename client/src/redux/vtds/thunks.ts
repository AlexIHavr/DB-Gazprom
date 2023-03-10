import { createAsyncThunk } from '@reduxjs/toolkit';
import { requestWithReject } from 'helpers/thunks';
import { checkRequiredColumns, excelRenderer } from 'helpers/excel';
import { vtdApi } from 'api/api';
import { addModalWindow, setIsLoading } from 'redux/app/reducer';
import { RejectValue } from 'redux/app/types';
import { Dispatch } from 'redux/store';

import { GetVtdsResponse, GetPipelineTable, TableType, PipelineTable } from './types';

export const setPipelineTable = createAsyncThunk<
  void,
  { vtdId: string; file: File; tableType: TableType },
  { rejectValue: string; dispatch: Dispatch }
>('setPipelineTable', async ({ vtdId, file, tableType }, { dispatch }) => {
  dispatch(setIsLoading(true));

  try {
    const pipelineTable = await excelRenderer(file);
    checkRequiredColumns(pipelineTable.columns, tableType);

    await vtdApi.put('/setPipelineTable', { id: vtdId, pipelineTable, tableType });

    dispatch(addModalWindow({ type: 'success', message: `Файл ${file.name} успешно загружен` }));
  } catch (err) {
    dispatch(addModalWindow({ type: 'error', message: (err as Error).message }));
  } finally {
    dispatch(setIsLoading(false));
  }
});

export const getVtds = createAsyncThunk<GetVtdsResponse>('getVtds', async () => {
  const { data } = await vtdApi.get<GetVtdsResponse>('/getVtds');
  return data;
});

export const getPipelineTable = createAsyncThunk<
  GetPipelineTable,
  { vtdId: string; tableType: TableType },
  { rejectValue: RejectValue }
>('getPipelineTable', async ({ vtdId, tableType }, { rejectWithValue }) => {
  return await requestWithReject(async () => {
    const { data } = await vtdApi.get<PipelineTable | undefined>('/getPipelineTable', { params: { id: vtdId, tableType } });
    return { vtdId, pipelineTable: data, tableType };
  }, rejectWithValue);
});
