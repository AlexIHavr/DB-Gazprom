import { FC, memo } from 'react';
import { PipelineTableProps as PipelineTablePropsType } from 'redux/vtds/types';

import TableManagePanel from './components/tableManagePanel/tableManagePanel.components';
import VirtualScrollWrapper from './components/virtualScrollWrapper/virtualScrollWrapper.component';

import './pipelineTable.styles.scss';

type PipelineTableProps = PipelineTablePropsType & {
  height?: number;
  width?: number;
};

const PipelineTable: FC<PipelineTableProps> = ({ table, vtdId, tableType, height, width }) => {
  return (
    <div className="pipelineTable">
      <TableManagePanel table={table} vtdId={vtdId} tableType={tableType} />
      <VirtualScrollWrapper table={table} vtdId={vtdId} tableType={tableType} width={width} height={height} />
    </div>
  );
};

export default memo(PipelineTable);
