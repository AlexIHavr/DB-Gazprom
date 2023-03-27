import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { devtools } from 'zustand/middleware';
import { GetVtdsResponse, PipelineTable } from 'redux/vtds/types';
import { vtdApi } from 'shared/api/api';
import { checkRequiredColumns, excelRenderer } from 'shared/helpers/excel';

import { useModalWindowsStore, usePreloaderStore } from '../../entities';

import { UseVtdTableStore } from './vtdTable.types';

const useVtdTableStore = create<UseVtdTableStore>()(
  immer(
    devtools((set) => ({
      vtds: [],

      setVtds: async () => {
        const { data } = await vtdApi.get<GetVtdsResponse>('/getVtds');
        set({ vtds: data.map((vtd) => ({ ...vtd, pipelineData: {} })) });
      },

      setPipelineTable: async ({ vtdId, tableType }) => {
        const { data } = await vtdApi.get<PipelineTable | undefined>('/getPipelineTable', { params: { id: vtdId, tableType } });
        set((state) => {
          const vtd = state.vtds.find(({ id }) => vtdId === id);

          if (vtd) vtd.pipelineData[tableType] = data || null;
        });
      },

      loadPipelineTable: async ({ vtdId, file, tableType }) => {
        const setIsLoading = usePreloaderStore.getState().setIsLoading;
        const addModalWindow = useModalWindowsStore.getState().addModalWindow;

        setIsLoading(true);

        try {
          const pipelineTable = await excelRenderer(file);
          checkRequiredColumns(pipelineTable.columns, tableType);

          await vtdApi.put('/loadPipelineTable', { id: vtdId, pipelineTable, tableType });

          addModalWindow({ type: 'success', message: `Файл ${file.name} успешно загружен` });
        } catch (err) {
          addModalWindow({ type: 'error', message: (err as Error).message });
        } finally {
          setIsLoading(false);
        }
      },
    })),
  ),
);

export default useVtdTableStore;
