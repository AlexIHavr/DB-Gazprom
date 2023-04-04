import { useCallback, memo, FC } from 'react';

import usePipelineTableStore from '../../pipelineTable.store';
import { ReactComponent as FilterOffSolid } from '../../assets/svg/filterOffSolid.svg';
import { ReactComponent as RestartSolid } from '../../assets/svg/restartSolid.svg';
import ShowColumnsButton from '../../ui/showColumnsButton/showColumnsButton.component';
import { COLUMN_WIDTH } from '../../consts/tableSettings';
import { getDefaultSortedRows } from '../../helpers/sortRows';
import { TableManagePanelProps } from '../../types/props';
import { SORT_TYPES } from '../../consts/searchSettings';
import { getDefaultExtendedFilter } from '../../helpers/getDefaults';
import { PipelineColumnProperties } from '../../types/pipelineTable';

import './tableManagePanel.styles.scss';

const TableManagePanel: FC<TableManagePanelProps> = ({ table: { vtdId, type, columns, rows } }) => {
  const [setColumnsProperties, setPipelineTableRows] = usePipelineTableStore((state) => [
    state.setColumnsProperties,
    state.setPipelineTableRows,
  ]);

  const resetColumns = useCallback(
    (properties: PipelineColumnProperties = {}) => {
      setColumnsProperties({
        vtdId,
        type,
        properties: { ...properties, sortType: SORT_TYPES.none, extendedFilter: getDefaultExtendedFilter() },
      });

      setPipelineTableRows({ vtdId, type, rows: getDefaultSortedRows(rows.map((row) => ({ ...row, hidden: false }))) });
    },
    [setColumnsProperties, setPipelineTableRows, rows, type, vtdId],
  );

  return (
    <div className="tableManagePanel">
      <ShowColumnsButton vtdId={vtdId} type={type} columns={columns} />
      <button title="Убрать все фильтры" onClick={() => resetColumns()}>
        <FilterOffSolid />
      </button>
      <button title="Сброс таблицы" onClick={() => resetColumns({ width: COLUMN_WIDTH, hidden: false })}>
        <RestartSolid />
      </button>
    </div>
  );
};

export default memo(TableManagePanel);
