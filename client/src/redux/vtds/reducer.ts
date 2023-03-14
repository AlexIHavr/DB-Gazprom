import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAddedColumnTable } from 'shared/helpers/reducers';

import { getPipelineTable, getVtds } from './thunks';
import {
  GetVtdsResponse,
  InitialState,
  PipelineColumn,
  PipelineColumnPartial,
  TableType,
  PipelineTable,
  PipelineTablePartial,
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
        properties: PipelineColumnPartial;
      }>,
    ) => {
      const { vtdId, tableType, properties, columnIndex } = action.payload;

      const pipelineTable = state.vtds.find(({ id }) => vtdId === id)!.pipelineData[tableType]!;

      for (const [key, value] of Object.entries(properties)) {
        (pipelineTable.columns[columnIndex][key as keyof PipelineColumn] as typeof value) = value;
      }
    },

    setColumnsProperties: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: TableType;
        properties: PipelineColumnPartial;
      }>,
    ) => {
      const { vtdId, tableType, properties } = action.payload;

      const pipelineTable = state.vtds.find(({ id }) => vtdId === id)!.pipelineData[tableType]!;

      for (const [key, value] of Object.entries(properties)) {
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
        properties: PipelineTablePartial;
      }>,
    ) => {
      const { vtdId, tableType, properties } = action.payload;

      const pipelineTable = state.vtds.find(({ id }) => vtdId === id)!.pipelineData[tableType]!;

      for (const [key, value] of Object.entries(properties)) {
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
      const { vtdId, tableType, name, index, values } = action.payload;

      const pipelineData = state.vtds.find(({ id }) => vtdId === id)!.pipelineData;

      pipelineData[tableType] = getAddedColumnTable({ pipelineTable: pipelineData[tableType]!, name, index, values });
    },
  },

  extraReducers: {
    [getPipelineTable.fulfilled.type]: (state, action: PayloadAction<GetPipelineTable>) => {
      const { vtdId, tableType, pipelineTable } = action.payload;

      state.vtds.find(({ id }) => vtdId === id)!.pipelineData[tableType] = pipelineTable || null;
    },

    [getVtds.fulfilled.type]: (state, action: PayloadAction<GetVtdsResponse>) => {
      state.vtds = action.payload.map((vtd) => ({ ...vtd, pipelineData: {} }));
    },
  },
});

export const { setColumnProperties, setColumnsProperties, setPipelineTableProperties, setVtdTree, addColumn } = vtdsSlice.actions;

const vtdsReducer = vtdsSlice.reducer;
export default vtdsReducer;
