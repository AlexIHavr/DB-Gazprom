import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { getPipelineTable, getVtdTree, setPipelineTable } from './thunks';
import {
  GetVtdTreeResponse,
  InitialState,
  PipelineColumn,
  PipelineColumnProperties,
  TableType,
  PipelineTable,
  PipelineTableProperties,
  GetPipelineTable,
} from './types';

const initialState: InitialState = {
  vtdTree: [],
};

export const vtdTreeSlice = createSlice({
  name: 'vtdTree',
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
      const pipelineTable = state.vtdTree.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType]!;

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
      const pipelineTable = state.vtdTree.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType]!;

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
      const pipelineTable = state.vtdTree.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType]!;

      for (const [key, value] of Object.entries(action.payload.properties)) {
        (pipelineTable[key as keyof PipelineTable] as typeof value) = value;
      }
    },
  },
  extraReducers: {
    [setPipelineTable.rejected.type]: (state, action: PayloadAction<{ message: string }>) => {
      console.log(action.payload.message);
    },
    [getPipelineTable.fulfilled.type]: (state, action: PayloadAction<GetPipelineTable>) => {
      if (action.payload.pipelineTable) {
        state.vtdTree.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType] =
          action.payload.pipelineTable;
      }
    },
    [getVtdTree.fulfilled.type]: (state, action: PayloadAction<GetVtdTreeResponse>) => {
      state.vtdTree = action.payload.map((vtd) => ({ ...vtd, pipelineData: {} }));
    },
  },
});

export const { setColumnProperties, setColumnsProperties, setPipelineTableProperties } = vtdTreeSlice.actions;

const vtdTreeReducer = vtdTreeSlice.reducer;
export default vtdTreeReducer;
