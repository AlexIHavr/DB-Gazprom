import { createAsyncThunk } from '@reduxjs/toolkit';

import { checkRequiredColumns, excelRenderer } from '../../helpers/excel';
import { addModalWindow, setIsLoading } from '../app/reducer';
import { vtdApi } from '../../api/api';

import { GetVtdsResponse, GetPipelineTable, TableType, PipelineTable } from './types';

export const setPipelineTable = createAsyncThunk<
  void,
  { vtdId: string; file: File; tableType: TableType },
  { rejectValue: string }
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

export const getPipelineTable = createAsyncThunk<GetPipelineTable, { vtdId: string; tableType: TableType }>(
  'getPipelineTable',
  async ({ vtdId, tableType }) => {
    const { data } = await vtdApi.get<PipelineTable | undefined>('/getPipelineTable', { params: { id: vtdId, tableType } });
    return { vtdId, pipelineTable: data, tableType };
  },
);
