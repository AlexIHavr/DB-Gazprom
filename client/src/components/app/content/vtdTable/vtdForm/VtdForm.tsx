import { memo, useLayoutEffect } from 'react';

import { useAppDispatch } from '../../../../../hooks/redux';
import { REQUIRED_COLUMNS_NAMES } from '../../../../../redux/vtds/constants';
import { addColumn } from '../../../../../redux/vtds/reducer';
import { PipelineTable as PipelineTableType, TableType } from '../../../../../redux/vtds/types';
import PipelineTable from '../../../../commons/pipelineTable/PipelineTable';

import { REPAIR_COLUMN_NAME } from './constants';

type VtdFormProps = {
  table: PipelineTableType;
  vtdId: string;
  tableType: TableType;
};

const VtdForm: React.FC<VtdFormProps> = ({ table, vtdId, tableType }) => {
  const dispatch = useAppDispatch();

  useLayoutEffect(() => {
    if (!table.columns.find(({ value }) => value === REPAIR_COLUMN_NAME)) {
      const tubeNumberIndex = table.columns.findIndex(({ value }) => value === REQUIRED_COLUMNS_NAMES.tubeNumberVtd) + 1;

      dispatch(addColumn({ vtdId, tableType, name: REPAIR_COLUMN_NAME, index: tubeNumberIndex }));
    }
  }, [dispatch, table.columns, tableType, vtdId]);

  return (
    <div className="vtdForm">
      <PipelineTable table={table} vtdId={vtdId} tableType={tableType} />
    </div>
  );
};

export default memo(VtdForm);
