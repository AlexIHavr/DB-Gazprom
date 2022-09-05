import { VTD_TREE_LEVELS } from '../components/app/content/vtdTree/constants';
import { AdaptedVtdTree } from '../components/app/content/vtdTree/types';
import { VtdTree } from '../redux/vtdTree/types';

export const getUniqueFields = <T extends object>(fieldsArr: T[], uniqueField: keyof T) => {
  const uniqueArr: T[keyof T][] = [];

  for (const fields of fieldsArr) {
    if (!uniqueArr.includes(fields[uniqueField])) uniqueArr.push(fields[uniqueField]);
  }

  return uniqueArr;
};

export const getAdaptedVtdTree = (vtdTree: VtdTree): AdaptedVtdTree => {
  const noDataVtdTree = vtdTree.map(({ id, type, pipeline, section, umg, year }) => ({ id, type, pipeline, section, umg, year }));

  return getUniqueFields(noDataVtdTree, VTD_TREE_LEVELS.type).map((type) => ({
    [VTD_TREE_LEVELS.type]: type,
    pipelines: getUniqueFields(
      noDataVtdTree.filter((typesVtd) => typesVtd.type === type),
      VTD_TREE_LEVELS.pipeline,
    ).map((pipeline) => ({
      [VTD_TREE_LEVELS.pipeline]: pipeline,
      sections: getUniqueFields(
        noDataVtdTree.filter((pipelinesVtd) => pipelinesVtd.type === type && pipelinesVtd.pipeline === pipeline),
        VTD_TREE_LEVELS.section,
      ).map((section) => {
        const sectionsFilter = noDataVtdTree.filter(
          (sectionVtd) => sectionVtd.type === type && sectionVtd.pipeline === pipeline && sectionVtd.section === section,
        );

        return {
          [VTD_TREE_LEVELS.section]: section,
          umg: sectionsFilter[0].umg,
          years: getUniqueFields(sectionsFilter, VTD_TREE_LEVELS.year).map((year) => {
            const yearsFilter = noDataVtdTree.filter(
              (yearsVtd) =>
                yearsVtd.type === type &&
                yearsVtd.pipeline === pipeline &&
                yearsVtd.section === section &&
                yearsVtd.year === year,
            );

            return {
              id: yearsFilter[0].id,
              year: yearsFilter[0].year,
            };
          }),
        };
      }),
    })),
  }));
};
