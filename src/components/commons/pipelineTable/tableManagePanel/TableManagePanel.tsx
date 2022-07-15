import { useState, useCallback, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { IconButton } from '@mui/material';
import { FilterAltOff, RestartAlt, VisibilityOutlined } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../redux/vtdTree/types';
import { useAppDispatch } from '../../../../hooks/redux';
import { setColumn, setColumns } from '../../../../redux/vtdTree/reducer';
import { COLUMN_WIDTH } from '../constants';

import { MAX_COUNT_SHOW_HIDDEN_COLUMNS } from './constants';
import './tableManagePanel.scss';

type TableManagePanelProps = {
  table: PipelineTable;
  vtdId: string;
  tableType: PipelineDataTables;
};

const TableManagePanel: React.FC<TableManagePanelProps> = ({ table, vtdId, tableType }) => {
  const dispatch = useAppDispatch();

  const [showVisiblyColumns, setShowVisiblyColumns] = useState(false);

  const hiddenColumns = useMemo(
    () => table.columns.filter(({ hidden }) => hidden),
    [table.columns],
  );

  const showVisiblyColumnsOnClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowVisiblyColumns((prev) => !prev);
  }, []);

  const showColumnOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, column: PipelineColumn) => {
      e.stopPropagation();
      dispatch(setColumn({ vtdId, tableType, column: { ...column, hidden: false } }));
      if (hiddenColumns.length === 1) setShowVisiblyColumns(false);
    },
    [dispatch, hiddenColumns.length, tableType, vtdId],
  );

  const showAllColumnsOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      dispatch(
        setColumns({
          vtdId,
          tableType,
          columns: table.columns.map((column) => ({ ...column, hidden: false })),
        }),
      );
      setShowVisiblyColumns(false);
    },
    [dispatch, table.columns, tableType, vtdId],
  );

  const resetTable = useCallback(() => {
    dispatch(
      setColumns({
        vtdId,
        tableType,
        columns: table.columns.map((column) => ({ ...column, width: COLUMN_WIDTH, hidden: false })),
      }),
    );
  }, [dispatch, table.columns, tableType, vtdId]);

  useEffect(() => {
    document.onclick = () => {
      if (showVisiblyColumns) setShowVisiblyColumns(false);
    };

    return () => {
      document.onclick = null;
    };
  }, [showVisiblyColumns]);

  return (
    <div className="tableManagePanel">
      <IconButton onClick={showVisiblyColumnsOnClick} disabled={!hiddenColumns.length}>
        <VisibilityIcon />
        <div
          className={classNames('visiblyColumns', {
            showSetting: showVisiblyColumns,
          })}
        >
          {(hiddenColumns.length > MAX_COUNT_SHOW_HIDDEN_COLUMNS
            ? hiddenColumns.slice(0, MAX_COUNT_SHOW_HIDDEN_COLUMNS)
            : hiddenColumns
          ).map((column) => (
            <div key={column.id} onClick={(e) => showColumnOnClick(e, column)}>
              <VisibilityOutlined />
              <span>{column.value}</span>
            </div>
          ))}
          {hiddenColumns.length > MAX_COUNT_SHOW_HIDDEN_COLUMNS && (
            <div className="notShowHiddenColumns" onClick={(e) => e.stopPropagation()}>
              Еще {hiddenColumns.length - MAX_COUNT_SHOW_HIDDEN_COLUMNS} шт...
            </div>
          )}
          <div className="showAllColumns" onClick={showAllColumnsOnClick}>
            <span>ПОКАЗАТЬ ВСЕ</span>
          </div>
        </div>
      </IconButton>
      <IconButton>
        <FilterAltOff />
      </IconButton>
      <IconButton onClick={resetTable}>
        <RestartAlt />
      </IconButton>
    </div>
  );
};

export default TableManagePanel;
