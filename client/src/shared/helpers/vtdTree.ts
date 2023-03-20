import { ValueOf } from 'redux/app/types';
import { VTD_TREE_LEVELS } from 'redux/vtds/constants';
import { Vtds, VtdTree } from 'redux/vtds/types';

export const getUniqueFields = <T extends object>(fieldsArr: T[], uniqueField: keyof T) => {
  const uniqueArr: ValueOf<T>[] = [];

  for (const fields of fieldsArr) {
    if (!uniqueArr.includes(fields[uniqueField])) uniqueArr.push(fields[uniqueField]);
  }

  return uniqueArr;
};

export const getVtdTree = (vtds: Vtds): VtdTree => {
  const noDataVtds = vtds.map(({ id, type, pipeline, section, umg, year }) => ({ id, type, pipeline, section, umg, year }));

  return getUniqueFields(noDataVtds, VTD_TREE_LEVELS.type).map((type) => ({
    header: type,
    children: getUniqueFields(
      noDataVtds.filter((typesVtd) => typesVtd.type === type),
      VTD_TREE_LEVELS.pipeline,
    ).map((pipeline) => ({
      header: pipeline,
      children: getUniqueFields(
        noDataVtds.filter((pipelinesVtd) => pipelinesVtd.type === type && pipelinesVtd.pipeline === pipeline),
        VTD_TREE_LEVELS.section,
      ).map((section) => {
        const sectionsFilter = noDataVtds.filter(
          (sectionVtd) => sectionVtd.type === type && sectionVtd.pipeline === pipeline && sectionVtd.section === section,
        );

        return {
          header: `${section} (${sectionsFilter[0].umg})`,
          children: getUniqueFields(sectionsFilter, VTD_TREE_LEVELS.year).map((year) => {
            const yearsFilter = noDataVtds.filter(
              (yearsVtd) =>
                yearsVtd.type === type &&
                yearsVtd.pipeline === pipeline &&
                yearsVtd.section === section &&
                yearsVtd.year === year,
            );

            return {
              id: yearsFilter[0].id,
              header: yearsFilter[0].year,
            };
          }),
        };
      }),
    })),
  }));
};
