import { create } from 'zustand';
import { vtdApi } from 'shared/api/api';
import { checkErrorsWrapper } from 'features';

import { UseVtdTableStore } from './types/store';
import { checkRequiredColumns } from './helpers/requiredColumns';
import { Vtds } from './types/vtds';
import { excelRenderer } from './helpers/excelRenderer';
import { PipelineTable } from './types/pipelineTable';

const useVtdTableStore = create<UseVtdTableStore>()((set) => ({
  vtds: [],

  setVtds: async () => {
    const { data } = await vtdApi.get<Vtds>('/getVtds');
    set({ vtds: data });
  },

  loadPipelineTable: async ({ vtdId, file, type }) => {
    const pipelineTable = await checkErrorsWrapper(
      `Файл ${file.name} успешно загружен`,
      async () => {
        const pipelineData = await excelRenderer(file);
        const pipelineTable: PipelineTable = { vtdId, type, ...pipelineData };

        checkRequiredColumns(pipelineData.columns, type);
        await vtdApi.put('/loadPipelineTable', { pipelineTable });

        return pipelineTable;
      },
      { loading: true },
    );

    return pipelineTable;
  },
}));

export default useVtdTableStore;
