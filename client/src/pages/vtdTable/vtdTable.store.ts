import { create } from 'zustand';
import { modalWindowWrapper } from 'features';
import ClientError from 'shared/errors/ClientError';

import { UseVtdTableStore } from './types/store';
import { excelParse } from './helpers/excelParser';
import VtdTableService from './services/vtdTable.service';
import { TABLE_TYPES_ENTRIES } from './consts/tableTypes';

const useVtdTableStore = create<UseVtdTableStore>()(() => ({
  createReport: async ({ vtdId, files }) => {
    for (const file of Array.from(files)) {
      const noExpFileName = file.name.split('.')[0];

      const typeEntry = TABLE_TYPES_ENTRIES.find(([, fileName]) => noExpFileName === fileName);

      await modalWindowWrapper(
        `Файл ${file.name} успешно загружен`,
        async () => {
          if (!typeEntry) throw ClientError.InvalidFileName(noExpFileName);

          const vtdTable = await excelParse(file);
          await VtdTableService.createAll({ vtdId, type: typeEntry[0], vtdTable });
        },
        { loading: true },
      );
    }
  },

  getVtdTable: async ({ vtdId, type }) => {
    return await VtdTableService.getAllByVtdId(vtdId, type);
  },
}));

export default useVtdTableStore;
