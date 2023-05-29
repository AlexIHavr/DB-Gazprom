import { modalWindowWrapper } from 'features';
import ClientError from 'shared/errors/ClientError';

import { TABLE_TYPES, TABLE_TYPES_ENTRIES, TABLE_TYPES_KEYS } from '../../vtdTable/consts/tableTypes';
import { excelParse } from '../../vtdTable/helpers/excelParser';
import vtdTableService from '../../vtdTable/services/vtdTable.service';
import vtdService from '../../vtdTree/services/vtdTree.service';
import { TABLE_TYPE_GROUPS } from '../../vtdTable/consts/tableTypeGroups';
import { CreateFormParams } from '../types/params';
import { VTD_TREE_LEVELS, VTD_TREE_LEVELS_KEYS, VTD_TREE_LEVEL_NAMES } from '../../vtdTree/consts/vtdTreeLevels';

export const createReport = async (vtdId: string, files: File[]) => {
  for (const file of files) {
    const noExpFileName = file.name.split('.')[0];

    const tableType = TABLE_TYPES_ENTRIES.find(
      ([, { name, groupName }]) => noExpFileName === name && groupName === TABLE_TYPE_GROUPS.report,
    )?.[0];

    await modalWindowWrapper(
      `Файл ${file.name} успешно загружен`,
      async () => {
        if (!tableType) throw ClientError.InvalidFileName(file.name);

        const vtdTable = await excelParse(file, noExpFileName);
        await vtdTableService.createAll({ vtdId, type: tableType, vtdTable });
      },
      { loading: true },
    );
  }
};

export const removeVtdTable = async (vtdId: string, typeName: string) => {
  await modalWindowWrapper(
    `Данные '${typeName}' успешно удалены`,
    async () => {
      const tableType = TABLE_TYPES_ENTRIES.find(([, { name }]) => name === typeName)?.[0];

      if (!tableType) throw ClientError.InvalidTableTypeName();

      await vtdTableService.deleteAllByVtdId(vtdId, tableType);
    },
    { loading: true },
  );
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
  return await modalWindowWrapper(
    `ВТД успешно добавлен`,
    async () => {
      const vtdData = VTD_TREE_LEVELS_KEYS.reduce(
        (prev, level) => ({ ...prev, [level]: (formData.get(level) as string).trim() || '' }),
        VTD_TREE_LEVEL_NAMES,
      );

      const emptyLevels = Object.keys(vtdData).reduce<string[]>((prev, level) => {
        const vtdLevel = level as VTD_TREE_LEVELS;
        if (vtdData[vtdLevel] === '') prev.push(VTD_TREE_LEVEL_NAMES[vtdLevel]);
        return prev;
      }, []);
      if (emptyLevels.length) throw ClientError.EmptyInputValues(emptyLevels);

      return await vtdService.createOne(vtdData);
    },
    { loading: true },
  );
};

export const createForm = async ({ vtdId, startKm }: CreateFormParams) => {
  await modalWindowWrapper(
    `Форма успешна создана`,
    async () => {
      await vtdTableService.createForm({ vtdId, startKm });
    },
    { loading: true },
  );
};
