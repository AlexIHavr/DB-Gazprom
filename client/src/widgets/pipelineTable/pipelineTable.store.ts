import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { vtdApi } from 'shared/api/api';

import { UsePipelineTableStore } from './types/store';
import { getPipelineTable } from './helpers/getPipelineTable';
import { GetPipelineTableResponse } from './types/requests';
import { getAddedColumnTable } from './helpers/changePipelineTable';

const usePipelineTableStore = create<UsePipelineTableStore>()(
  devtools(
    immer((set) => ({
      pipelineTables: [],

      addPipelineTable: async ({ vtdId, type }) => {
        const { data } = await vtdApi.get<GetPipelineTableResponse>('/getPipelineTable', { params: { vtdId, type } });

        set((state) => {
          if (!data) return;

          const pipelineTable = getPipelineTable({ pipelineTables: state.pipelineTables, vtdId, type });
          if (!pipelineTable) state.pipelineTables.push(data);
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
