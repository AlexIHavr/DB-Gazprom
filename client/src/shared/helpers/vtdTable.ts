import { store } from 'redux/store';
import { REQUIRED_COLUMNS_NAMES } from 'redux/vtds/constants';
import { InnerCellTables, InnerRowsTables, PipelineRows, VtdTree } from 'redux/vtds/types';

type GetRepairsInnerRowsTablesParams = {
  rows: PipelineRows;
  pipelineYears: VtdTree;
  pipelineYear: string;
  columnIndex: number;
};

export const getRepairsInnerRowsTables = ({
  rows,
  pipelineYears,
  pipelineYear,
  columnIndex,
}: GetRepairsInnerRowsTablesParams) => {
  const vtds = store.getState().vtds.vtds;

  return rows.reduce<InnerRowsTables>((innerTables, { values }, i) => {
    const innerTable = pipelineYears.reduce<InnerCellTables>((innerTable, { id, header }) => {
      const repairTable = vtds.find((vtd) => vtd.id === id)?.pipelineData.repairs;

      if (repairTable) {
        const repairTubeNumberIndex = repairTable.columns.findIndex(
          ({ value }) => value === `${REQUIRED_COLUMNS_NAMES.tubeNumberRepairs} ${pipelineYear}`,
        );

        if (repairTubeNumberIndex !== -1) {
          const innerTableRows = repairTable.rows.filter(
            (row) => row.values[repairTubeNumberIndex].value === values[columnIndex].value,
          );

          if (innerTableRows.length) {
            innerTable[header] = {
              columns: repairTable.columns,
              rows: innerTableRows,
            };
          }
        }
      }

      return innerTable;
    }, {});

    if (Object.keys(innerTable).length) innerTables[i] = innerTable;
    return innerTables;
  }, {});
};
