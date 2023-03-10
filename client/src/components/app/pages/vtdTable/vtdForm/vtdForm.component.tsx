import { memo, useLayoutEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { REQUIRED_COLUMNS_NAMES } from 'redux/vtds/constants';
import { addColumn } from 'redux/vtds/reducer';
import { getPipelineTable } from 'redux/vtds/thunks';
import { ExcelValue, InnerTables, PipelineTable as PipelineTableType, TableType } from 'redux/vtds/types';
import { getRepairsInnerRowsTables } from 'helpers/vtdTable';
import PipelineTable from 'components/commons/pipelineTable/PipelineTable';

import { REPAIR_COLUMN_NAME } from './vtdForm.constants';

type VtdFormProps = {
  table: PipelineTableType;
  vtdId: string;
  tableType: TableType;
};

const VtdForm: React.FC<VtdFormProps> = ({ table, vtdId, tableType }) => {
  const dispatch = useAppDispatch();
  const { vtds, vtdTree } = useAppSelector((state) => state.vtds);

  const [isLoadedRepairs, setIsLoadedRepairs] = useState(false);
  const [innerTables, setInnerTables] = useState<InnerTables>();

  const pipelineData = useMemo(() => vtds.find(({ id }) => id === vtdId)!, [vtdId, vtds]);

  const pipelineYears = useMemo(() => {
    return vtdTree
      .find(({ type }) => pipelineData.type === type)
      ?.pipelines.find(({ pipeline }) => pipelineData.pipeline === pipeline)
      ?.sections.find(({ section }) => pipelineData.section === section)?.years;
  }, [pipelineData.pipeline, pipelineData.section, pipelineData.type, vtdTree]);

  useLayoutEffect(() => {
    //load all repairs for pipeline
    if (!isLoadedRepairs) {
      pipelineYears?.forEach(({ id }) => {
        if (!vtds.find((vtd) => vtd.id === id)?.pipelineData.repairs) {
          dispatch(getPipelineTable({ vtdId: id, tableType: 'repairs' }));
        }
      });
      setIsLoadedRepairs(true);
      return;
    }

    if (
      pipelineYears?.every(({ id }) => vtds.find((vtd) => vtd.id === id)?.pipelineData.repairs !== undefined) &&
      pipelineYears?.some(({ id }) => vtds.find((vtd) => vtd.id === id)?.pipelineData.repairs) &&
      !table.columns.find(({ value }) => value === REPAIR_COLUMN_NAME)
    ) {
      const tubeNumberIndex = table.columns.findIndex(({ value }) => value === REQUIRED_COLUMNS_NAMES.tubeNumberVtd);
      const repairsInnerRowsTables = getRepairsInnerRowsTables({
        rows: table.rows,
        pipelineYears,
        pipelineYear: pipelineData.year,
        columnIndex: tubeNumberIndex,
      });
      const values = new Array<ExcelValue>(table.rows.length)
        .fill(null)
        .map((value, i) => (repairsInnerRowsTables[i] ? '+' : value));

      setInnerTables({ [tubeNumberIndex + 1]: repairsInnerRowsTables });

      dispatch(addColumn({ vtdId, tableType, name: REPAIR_COLUMN_NAME, index: tubeNumberIndex + 1, values }));
    }
  }, [dispatch, isLoadedRepairs, pipelineData.year, pipelineYears, table.columns, table.rows, tableType, vtdId, vtds]);

  return (
    <div className="vtdForm">
      <PipelineTable table={table} vtdId={vtdId} tableType={tableType} innerTables={innerTables} />
    </div>
  );
};

export default memo(VtdForm);
