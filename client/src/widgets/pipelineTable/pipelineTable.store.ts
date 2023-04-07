import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';

import { UsePipelineTableStore } from './types/store';
import { getPipelineTable } from './helpers/getPipelineTable';
import { getAddedColumnTable } from './helpers/changePipelineTable';
import PipelineTableService from './services/pipelineTable.service';

const usePipelineTableStore = create<UsePipelineTableStore>()(
  devtools(
    immer((set) => ({
      pipelineTables: [],

      addPipelineTable: async ({ vtdId, type }) => {
        const pipelineTableFromDB = await PipelineTableService.getPipelineTable(vtdId, type);
        if (!pipelineTableFromDB) return;

        set((state) => {
          const pipelineTable = getPipelineTable({ pipelineTables: state.pipelineTables, vtdId, type });
          if (!pipelineTable) state.pipelineTables.push(pipelineTableFromDB);
        });
      },

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

      addColumn: ({ vtdId, type, name, index, values }) =>
        set((state) => {
          const pipelineTable = getPipelineTable({ pipelineTables: state.pipelineTables, vtdId, type });

          if (pipelineTable) {
            const addedColumnTable = getAddedColumnTable({ pipelineTable, name, index, values });
            pipelineTable.rows = addedColumnTable.rows;
            pipelineTable.columns = addedColumnTable.columns;
          }
        }),
    })),
  ),
);

export default usePipelineTableStore;
