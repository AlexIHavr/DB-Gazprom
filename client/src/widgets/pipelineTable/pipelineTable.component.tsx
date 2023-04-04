import { FC, memo } from 'react';

import TableManagePanel from './components/tableManagePanel/tableManagePanel.components';
import VirtualScrollWrapper from './components/virtualScrollWrapper/virtualScrollWrapper.component';
import { PipelineTableProps } from './types/props';

import './pipelineTable.styles.scss';

const PipelineTable: FC<PipelineTableProps> = ({ table, height, width }) => {
  return (
    <div className="pipelineTable">
      <TableManagePanel table={table} />
      <VirtualScrollWrapper table={table} width={width} height={height} />
    </div>
  );
};

export default memo(PipelineTable);
