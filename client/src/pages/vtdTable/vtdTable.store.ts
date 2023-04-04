import { create } from 'zustand';
import { vtdApi } from 'shared/api/api';

import { useModalWindowsStore, usePreloaderStore } from '../../entities';

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
    const setIsLoading = usePreloaderStore.getState().setIsLoading;
    const addModalWindow = useModalWindowsStore.getState().addModalWindow;

    setIsLoading(true);

    try {
      const pipelineData = await excelRenderer(file);
      const pipelineTable: PipelineTable = { vtdId, type, ...pipelineData };

      checkRequiredColumns(pipelineData.columns, type);

      await vtdApi.put('/loadPipelineTable', { pipelineTable });

      addModalWindow({ type: 'success', message: `Файл ${file.name} успешно загружен` });

      return pipelineTable;
    } catch (err) {
      addModalWindow({ type: 'error', message: (err as Error).message });
    } finally {
      setIsLoading(false);
    }
  },
}));

export default useVtdTableStore;
