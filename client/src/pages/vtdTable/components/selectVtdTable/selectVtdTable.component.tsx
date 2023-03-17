import { memo } from 'react';
import PipelineTable from 'components/commons/pipelineTable/PipelineTable';
import { TABLE_TYPES } from 'redux/vtds/constants';
import { PipelineTable as PipelineTableType, TableType } from 'redux/vtds/types';
import { VtdForm } from 'widgets';
import { LoadTableButton } from 'shared';

type SelectVtdTableProps = {
  table?: PipelineTableType | null;
  vtdId?: string;
  tableType: TableType;
};

const SelectVtdTable: React.FC<SelectVtdTableProps> = ({ table, vtdId, tableType }) => {
  return (
    <>
      {table && vtdId ? (
        tableType === TABLE_TYPES.form.type ? (
          <VtdForm table={table} vtdId={vtdId} tableType={tableType} />
        ) : (
          <PipelineTable table={table} vtdId={vtdId} tableType={tableType} />
        )
      ) : (
        table === null && <LoadTableButton vtdId={vtdId!} tableType={tableType} />
      )}
    </>
  );
};

export default memo(SelectVtdTable);
