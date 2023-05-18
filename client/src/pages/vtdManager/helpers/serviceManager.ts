import { modalWindowWrapper } from 'features';
import ClientError from 'shared/errors/ClientError';

import { TABLE_TYPES, TABLE_TYPES_ENTRIES, TABLE_TYPES_KEYS } from '../../vtdTable/consts/tableTypes';
import { excelParse } from '../../vtdTable/helpers/excelParser';
import vtdTableService from '../../vtdTable/services/vtdTable.service';
import vtdService from '../../vtdTree/services/vtdTree.service';
import { VTD_TREE_LEVEL_NAMES } from '../../vtdTree/consts/vtdTreeLevels';
import { VtdTreeLevel } from '../../vtdTree/types/vtdTree';
import { TABLE_TYPE_GROUPS } from '../../vtdTable/consts/tableTypeGroups';

export const createReport = async (vtdId: string, files: FileList) => {
  for (const file of Array.from(files)) {
    const noExpFileName = file.name.split('.')[0];

    const tableType = TABLE_TYPES_ENTRIES.find(
      ([, { name, groupName }]) => noExpFileName === name && groupName === TABLE_TYPE_GROUPS.report,
    )?.[0];

    await modalWindowWrapper(
      `Файл ${file.name} успешно загружен`,
      async () => {
        if (!tableType) throw ClientError.InvalidFileName(noExpFileName);

        const vtdTable = await excelParse(file);
        await vtdTableService.createAll({ vtdId, type: tableType, vtdTable });
      },
      { loading: true },
    );
  }
};

export const removeReport = async (vtdId: string) => {
  for (const tableType of TABLE_TYPES_KEYS) {
    try {
      await modalWindowWrapper(
        `Данные '${TABLE_TYPES[tableType].name}' успешно удалены`,
        async () => {
          await vtdTableService.deleteAllByVtdId(vtdId, tableType);
        },
        { loading: true },
      );
    } catch (error) {
      continue;
    }
  }
};

export const removeVtd = async (vtdId: string) => {
  await modalWindowWrapper(
    `ВТД успешно удалено`,
    async () => {
      await vtdService.deleteOneById(vtdId);
    },
    { loading: true },
  );
};

export const createVtd = async (formData: FormData) => {
  await modalWindowWrapper(
    `ВТД успешно добавлен`,
    async () => {
      const emptyLevel = Array.from(formData).find(([, levelValue]) => (levelValue as string).trim() === '')?.[0];

      if (emptyLevel) throw ClientError.EmptyInputValue(VTD_TREE_LEVEL_NAMES[emptyLevel as VtdTreeLevel]);

      await vtdService.createOne(formData);
    },
    { loading: true },
  );
};

export const createForm = async (vtdId: string) => {
  await modalWindowWrapper(
    `Форма успешна создана`,
    async () => {
      await vtdTableService.createForm(vtdId);
    },
    { loading: true },
  );
};
