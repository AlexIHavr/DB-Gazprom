import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getDefaultColumn } from '../../helpers/excel';
import { getAddedColumnTable } from '../../helpers/reducers';

import { getPipelineTable, getVtds } from './thunks';
import {
  GetVtdsResponse,
  InitialState,
  PipelineColumn,
  PipelineColumnProperties,
  TableType,
  PipelineTable,
  PipelineTableProperties,
  GetPipelineTable,
  VtdTree,
  ExcelRow,
} from './types';

const initialState: InitialState = {
  vtds: [],
  vtdTree: [],
};

export const vtdsSlice = createSlice({
  name: 'vtds',
  initialState,
  reducers: {
    setColumnProperties: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: TableType;
        columnIndex: number;
        properties: PipelineColumnProperties;
      }>,
    ) => {
      const pipelineTable = state.vtds.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType]!;

      for (const [key, value] of Object.entries(action.payload.properties)) {
        (pipelineTable.columns[action.payload.columnIndex][key as keyof PipelineColumn] as typeof value) = value;
      }
    },

    setColumnsProperties: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: TableType;
        properties: PipelineColumnProperties;
      }>,
    ) => {
      const pipelineTable = state.vtds.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType]!;

      for (const [key, value] of Object.entries(action.payload.properties)) {
        pipelineTable.columns.forEach(
          ({ index }) => ((pipelineTable.columns[index][key as keyof PipelineColumn] as typeof value) = value),
        );
      }
    },

    setPipelineTableProperties: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: TableType;
        properties: PipelineTableProperties;
      }>,
    ) => {
      const pipelineTable = state.vtds.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType]!;

      for (const [key, value] of Object.entries(action.payload.properties)) {
        (pipelineTable[key as keyof PipelineTable] as typeof value) = value;
      }
    },

    setVtdTree: (state, action: PayloadAction<VtdTree>) => {
      state.vtdTree = action.payload;
    },

    addColumn: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: TableType;
        name: string;
        index: number;
        values?: ExcelRow;
      }>,
    ) => {
      const pipelineData = state.vtds.find(({ id }) => action.payload.vtdId === id)!.pipelineData;

      pipelineData[action.payload.tableType] = getAddedColumnTable({
        pipelineTable: pipelineData[action.payload.tableType]!,
        name: action.payload.name,
        index: action.payload.index,
        values: action.payload.values,
      });
    },
  },

  extraReducers: {
    [getPipelineTable.fulfilled.type]: (state, action: PayloadAction<GetPipelineTable>) => {
      if (action.payload.pipelineTable) {
        state.vtds.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType] =
          action.payload.pipelineTable;
      }
    },
    [getVtds.fulfilled.type]: (state, action: PayloadAction<GetVtdsResponse>) => {
      state.vtds = action.payload.map((vtd) => ({ ...vtd, pipelineData: {} }));
    },
  },
});

export const { setColumnProperties, setColumnsProperties, setPipelineTableProperties, setVtdTree, addColumn } = vtdsSlice.actions;

const vtdsReducer = vtdsSlice.reducer;
export default vtdsReducer;
