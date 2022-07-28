import { useState, useCallback, useMemo, useEffect, memo } from 'react';
import classNames from 'classnames';
import { FilterAltOff, RestartAlt, VisibilityOutlined } from '@mui/icons-material';
import VisibilityIcon from '@mui/icons-material/Visibility';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../redux/vtdTree/types';
import { useAppDispatch } from '../../../../hooks/redux';
import { setColumnProperties, setColumnsProperties, setSortedRows } from '../../../../redux/vtdTree/reducer';
import { COLUMN_WIDTH } from '../constants';

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
      dispatch(setColumnProperties({ vtdId, tableType, columnIndex: column.index, properties: { hidden: false } }));
      if (hiddenColumns.length === 1) setShowVisiblyColumns(false);
    },
    [dispatch, hiddenColumns.length, tableType, vtdId],
  );

  const showAllColumnsOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      dispatch(
        setColumnsProperties({
          vtdId,
          tableType,
          properties: { hidden: false },
        }),
      );
      setShowVisiblyColumns(false);
    },
    [dispatch, tableType, vtdId],
  );

  const resetTable = useCallback(() => {
    dispatch(
      setColumnsProperties({
        vtdId,
        tableType,
        properties: {
          width: COLUMN_WIDTH,
          hidden: false,
          sortType: null,
        },
      }),
    );
    dispatch(setSortedRows({ vtdId, tableType, sortedRows: table.rows }));
  }, [dispatch, table.rows, tableType, vtdId]);

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
      <button
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
          {showVisiblyColumns && (
            <>
              {hiddenColumns.map((column) => (
                <div key={column.id} onClick={(e) => showColumnOnClick(e, column)}>
                  <VisibilityOutlined />
                  <span>{column.value}</span>
                </div>
              ))}
              <div className="showAllColumns" onClick={showAllColumnsOnClick}>
                <span>ПОКАЗАТЬ ВСЕ</span>
              </div>
            </>
          )}
        </div>
      </button>
      <button title="Убрать все фильтры">
        <FilterAltOff />
      </button>
      <button title="Сброс таблицы" onClick={resetTable}>
        <RestartAlt />
      </button>
    </div>
  );
};

export default memo(TableManagePanel);
