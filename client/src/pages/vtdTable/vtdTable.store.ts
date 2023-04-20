import { create } from 'zustand';
import { modalWindowWrapper } from 'features';

import { UseVtdTableStore } from './types/store';
import { excelParse } from './helpers/excelParser';
import VtdTableService from './services/vtdTable.service';

const useVtdTableStore = create<UseVtdTableStore>()((set) => ({
  vtds: [],

  setVtds: async () => {
    const vtds = await VtdTableService.getAll();
    set({ vtds });
  },

  createVtdTable: async ({ vtdId, type, file }) => {
    await modalWindowWrapper(
      `Файл ${file.name} успешно загружен`,
      async () => {
        const vtdTable = await excelParse(file);

        await VtdTableService.createAll({ vtdId, type, vtdTable });
      },
      { loading: true },
    );
  },

  getVtdTable: async ({ vtdId, type }) => {
    return await VtdTableService.getAllByVtdId(vtdId, type);
  },
}));

export default useVtdTableStore;
