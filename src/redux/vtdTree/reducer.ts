import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import {
  InitialState,
  PipelineColumn,
  PipelineColumnProperties,
  PipelineData,
  PipelineDataTables,
  PipelineTable,
  PipelineTableProperties,
} from './types';

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
      state.vtdTree.find(({ id }) => action.payload.vtdId === id)!.pipelineData = action.payload.data;
    },

    setColumnProperties: (
      state,
      action: PayloadAction<{
        vtdId: string;
        tableType: PipelineDataTables;
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
        tableType: PipelineDataTables;
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
        tableType: PipelineDataTables;
        properties: PipelineTableProperties;
      }>,
    ) => {
      const pipelineTable = state.vtdTree.find(({ id }) => action.payload.vtdId === id)!.pipelineData[action.payload.tableType]!;

      for (const [key, value] of Object.entries(action.payload.properties)) {
        (pipelineTable[key as keyof PipelineTable] as typeof value) = value;
      }
    },
  },
});

export const { setPipelinesData, setColumnProperties, setColumnsProperties, setPipelineTableProperties } = vtdTreeSlice.actions;

const vtdTreeReducer = vtdTreeSlice.reducer;
export default vtdTreeReducer;
