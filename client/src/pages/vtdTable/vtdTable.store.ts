import { create } from 'zustand';
import { modalWindowWrapper } from 'features';

import { UseVtdTableStore } from './types/store';
import { checkRequiredColumns } from './helpers/requiredColumns';
import { excelRenderer } from './helpers/excelRenderer';
import VtdTableService from './services/vtdTable.service';

const useVtdTableStore = create<UseVtdTableStore>()((set) => ({
  vtds: [],

  setVtds: async () => {
    const vtds = await VtdTableService.getAll();
    set({ vtds });
  },

  loadPipelineTable: async ({ vtdId, type, file }) => {
    const pipelineTable = await modalWindowWrapper(
      `Файл ${file.name} успешно загружен`,
      async () => {
        const pipelineData = await excelRenderer(file);
        const pipelineTable = { vtdId, type, ...pipelineData };

        checkRequiredColumns(pipelineData.columns, type);
        await VtdTableService.loadPipelineTable(pipelineTable);

        return pipelineTable;
      },
      { loading: true },
    );

    return pipelineTable;
  },
}));

export default useVtdTableStore;
