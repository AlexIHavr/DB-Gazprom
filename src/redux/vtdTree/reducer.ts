import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { InitialState, PipelineColumn, PipelineData, PipelineDataTables } from './types';

const initialState: InitialState = {
  vtdTree: [
    {
      id: '1',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи III',
      section: '390-424',
      umg: 'Оршанское',
      year: '2018',
      pipelineData: {},
    },
    {
      id: '2',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи III',
      section: '390-424',
      umg: 'Оршанское',
      year: '2006',
      pipelineData: {},
    },
    {
      id: '3',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи III',
      section: '390-424',
      umg: 'Оршанское',
      year: '2003',
      pipelineData: {},
    },
    {
      id: '4',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи III',
      section: '425,9-529',
      umg: 'Оршанское-Крупское',
      year: '2020',
      pipelineData: {},
    },
    {
      id: '5',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи III',
      section: '425,9-529',
      umg: 'Оршанское-Крупское',
      year: '2015',
      pipelineData: {},
    },
    {
      id: '6',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи III',
      section: '425,9-529',
      umg: 'Оршанское-Крупское',
      year: '2006',
      pipelineData: {},
    },
    {
      id: '7',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи II',
      section: '390-424',
      umg: 'Оршанское',
      year: '2018',
      pipelineData: {},
    },
    {
      id: '8',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи II',
      section: '390-424',
      umg: 'Оршанское',
      year: '2006',
      pipelineData: {},
    },
    {
      id: '9',
      type: 'Магистральные газопроводы',
      pipeline: 'МГ Торжок-Минск-Ивацевичи II',
      section: '390-424',
      umg: 'Оршанское',
      year: '2003',
      pipelineData: {},
    },
    {
      id: '10',
      type: 'Газопроводы-отводы',
      pipeline: 'газопровод-отвод Минск-Гомель',
      section: '1,5-65',
      umg: 'Минское-Осиповичское',
      year: '2006',
      pipelineData: {},
    },
    {
      id: '11',
      type: 'Газопроводы-отводы',
      pipeline: 'газопровод-отвод Минск-Гомель',
      section: '1,5-65',
      umg: 'Минское-Осиповичское',
      year: '2002',
      pipelineData: {},
    },
    {
      id: '12',
      type: 'Газопроводы-отводы',
      pipeline: 'газопровод-отвод Минск-Гомель',
      section: '65,01-190,24',
      umg: 'Осиповичское',
      year: '2006',
      pipelineData: {},
    },
    {
      id: '13',
      type: 'Газопроводы-отводы',
      pipeline: 'газопровод-отвод Минск-Гомель',
      section: '65,01-190,24',
      umg: 'Оршанское',
      year: '2002',
      pipelineData: {},
    },
  ],
};

export const vtdTreeSlice = createSlice({
  name: 'vtdTree',
  initialState,
  reducers: {
    setPipelinesData: (state, action: PayloadAction<{ vtdId: string; data: PipelineData }>) => {
      state.vtdTree.find(({ id }) => action.payload.vtdId === id)!.pipelineData =
        action.payload.data;
    },
    setColumn: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: PipelineDataTables;
        column: PipelineColumn;
      }>,
    ) => {
      const pipelineTable = state.vtdTree.find(({ id }) => action.payload.vtdId === id)!
        .pipelineData[action.payload.tableType]!;
      const columnIndex = pipelineTable.columns.findIndex(
        ({ id }) => action.payload.column.id === id,
      );

      pipelineTable.columns[columnIndex] = action.payload.column;
    },
    setColumns: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: PipelineDataTables;
        columns: PipelineColumn[];
      }>,
    ) => {
      const pipelineTable = state.vtdTree.find(({ id }) => action.payload.vtdId === id)!
        .pipelineData[action.payload.tableType]!;

      pipelineTable.columns = action.payload.columns;
    },
  },
});

export const { setPipelinesData, setColumn, setColumns } = vtdTreeSlice.actions;

const vtdTreeReducer = vtdTreeSlice.reducer;
export default vtdTreeReducer;
