import { useCallback, memo, FC } from 'react';
import { PipelineColumnPartial, PipelineTableProps } from 'redux/vtds/types';
import { SORT_TYPES } from 'redux/vtds/constants';
import { useAppDispatch } from 'hooks/redux';
import { setColumnsProperties, setPipelineTableProperties } from 'redux/vtds/reducer';

import { ReactComponent as FilterOffSolid } from '../../assets/svg/filterOffSolid.svg';
import { ReactComponent as RestartSolid } from '../../assets/svg/restartSolid.svg';
import ShowColumnsButton from '../../ui/showColumnsButton/showColumnsButton.component';
import { COLUMN_WIDTH } from '../../consts/tableSettings';
import { getDefaultSortedRows } from '../../helpers/sortRows';

import './tableManagePanel.styles.scss';

const TableManagePanel: FC<PipelineTableProps> = ({ table, vtdId, tableType }) => {
  const dispatch = useAppDispatch();

  const resetColumns = useCallback(
    (properties: PipelineColumnPartial = {}) => {
      dispatch(
        setColumnsProperties({
          vtdId,
          tableType,
          properties: {
            ...properties,
            sortType: SORT_TYPES.none,
            extendedFilter: { visible: false, checkedUniqueRowsValues: [] },
          },
        }),
      );

      dispatch(
        setPipelineTableProperties({
          vtdId,
          tableType,
          properties: {
            rows: getDefaultSortedRows(table.rows.map((row) => ({ ...row, hidden: false }))),
          },
        }),
      );
    },
    [dispatch, table.rows, tableType, vtdId],
  );

  return (
    <div className="tableManagePanel">
      <ShowColumnsButton table={table} tableType={tableType} vtdId={vtdId} />
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
