import { useState, useCallback, useMemo, useEffect } from 'react';
import classNames from 'classnames';
import { IconButton } from '@mui/material';
import { FilterAltOff, RestartAlt, VisibilityOutlined } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../redux/vtdTree/types';
import { useAppDispatch } from '../../../../hooks/redux';
import { setColumn, setColumns, setSortedRows } from '../../../../redux/vtdTree/reducer';
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

  const hiddenColumns = useMemo(() => table.columns.filter(({ hidden }) => hidden), [table.columns]);

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
        columns: table.columns.map((column) => ({
          ...column,
          width: COLUMN_WIDTH,
          hidden: false,
          sortType: null,
        })),
      }),
    );
    dispatch(setSortedRows({ vtdId, tableType, sortedRows: table.rows }));
  }, [dispatch, table.columns, table.rows, tableType, vtdId]);

  const hiddenColumnsOnDisplay = useMemo(
    () =>
      hiddenColumns.length > MAX_COUNT_SHOW_HIDDEN_COLUMNS
        ? hiddenColumns.slice(0, MAX_COUNT_SHOW_HIDDEN_COLUMNS)
        : hiddenColumns,
    [hiddenColumns],
  );

  useEffect(() => {
    if (!showVisiblyColumns) return;

    const hideVisibleColumns = () => setShowVisiblyColumns(false);
    document.addEventListener('click', hideVisibleColumns);

    return () => {
      document.removeEventListener('click', hideVisibleColumns);
    };
  }, [showVisiblyColumns]);

  return (
    <div className="tableManagePanel">
      <IconButton
        title="Показать скрытие колонки"
        className={classNames({ active: showVisiblyColumns })}
        onClick={showVisiblyColumnsOnClick}
        disabled={!hiddenColumns.length}
      >
        <VisibilityIcon />
        <div
          className={classNames('visiblyColumns', {
            showSetting: showVisiblyColumns,
          })}
        >
          {hiddenColumnsOnDisplay.map((column) => (
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
      <IconButton title="Убрать все фильтры">
        <FilterAltOff />
      </IconButton>
      <IconButton title="Сброс таблицы" onClick={resetTable}>
        <RestartAlt />
      </IconButton>
    </div>
  );
};

export default TableManagePanel;
