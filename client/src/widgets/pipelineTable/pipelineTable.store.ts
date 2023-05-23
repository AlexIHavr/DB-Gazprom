import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import { UsePipelineTableStore } from './types/store';
import { getPipelineTable } from './helpers/pipelineTableGetters';
import { getDefaultPipelineData } from './helpers/getDefaults';

const usePipelineTableStore = create<UsePipelineTableStore>()(
  devtools(
    immer((set) => ({
      pipelineTables: [],

      addPipelineTable: async ({ vtdId, type, excelRows }) =>
        set((state) => {
          const pipelineTableFromStore = getPipelineTable({ pipelineTables: state.pipelineTables, vtdId, type });
          if (!pipelineTableFromStore) state.pipelineTables.push({ vtdId, type, ...getDefaultPipelineData(excelRows) });
        }),

      setColumnProperties: ({ vtdId, type, index, properties }) =>
        set((state) => {
          const pipelineTable = getPipelineTable({ pipelineTables: state.pipelineTables, vtdId, type });

          if (pipelineTable) pipelineTable.columns[index] = { ...pipelineTable.columns[index], ...properties };
        }),

      setColumnsProperties: ({ vtdId, type, properties }) =>
        set((state) => {
          const pipelineTable = getPipelineTable({ pipelineTables: state.pipelineTables, vtdId, type });

          if (pipelineTable) {
            pipelineTable.columns.forEach(
              ({ index }) => (pipelineTable.columns[index] = { ...pipelineTable.columns[index], ...properties }),
            );
          }
        }),

      setPipelineTableRows: ({ vtdId, type, rows }) =>
        set((state) => {
          const pipelineTable = getPipelineTable({ pipelineTables: state.pipelineTables, vtdId, type });

          if (pipelineTable) pipelineTable.rows = rows;
        }),
    })),
  ),
);

export default usePipelineTableStore;
