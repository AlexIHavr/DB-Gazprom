import classNames from 'classnames';
import { FilterAlt } from '@mui/icons-material';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../redux/vtdTree/types';
import { useAppDispatch } from '../../../../../hooks/redux';
import { setColumnProperties } from '../../../../../redux/vtdTree/reducer';

import './extendedFilter.scss';
import ExtendedFilterPanel from './extendedFilterPanel/ExtendedFilterPanel';

type ExtendedFilterProps = {
  vtdId: string;
  tableType: PipelineDataTables;
  table: PipelineTable;
  column: PipelineColumn;
};

const ExtendedFilter: React.FC<ExtendedFilterProps> = ({ table, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();
  const [rightDirection, setRightDirection] = useState(false);
  const extendedFilterPanelWrapperRef = useRef<HTMLDivElement>(null);

  const showExtendedFilter = useCallback(
    (e: React.MouseEvent) => {
      if (e.button) return;
      e.stopPropagation();

      if (
        extendedFilterPanelWrapperRef.current!.getBoundingClientRect().left +
          extendedFilterPanelWrapperRef.current!.offsetWidth +
          50 >
        document.documentElement.clientWidth
      ) {
        setRightDirection(true);
      } else {
        setRightDirection(false);
      }

      const visibleExtendedFilterColumn = table.columns.find(
        ({ extendedFilter: { visible }, id }) => id !== column.id && visible,
      );

      if (visibleExtendedFilterColumn) {
        dispatch(
          setColumnProperties({
            vtdId,
            tableType,
            columnIndex: visibleExtendedFilterColumn.index,
            properties: {
              extendedFilter: { ...visibleExtendedFilterColumn.extendedFilter, visible: false },
            },
          }),
        );
      }

      dispatch(
        setColumnProperties({
          vtdId,
          tableType,
          columnIndex: column.index,
          properties: {
            extendedFilter: { ...column.extendedFilter, visible: !column.extendedFilter.visible },
          },
        }),
      );
    },
    [column.extendedFilter, column.id, column.index, dispatch, table.columns, tableType, vtdId],
  );

  useEffect(() => {
    if (!column.extendedFilter.visible) return;

    const hideExtendedFilter = () => {
      dispatch(
        setColumnProperties({
          vtdId,
          tableType,
          columnIndex: column.index,
          properties: { extendedFilter: { ...column.extendedFilter, visible: false } },
        }),
      );
    };

    document.addEventListener('mousedown', hideExtendedFilter);

    return () => {
      document.removeEventListener('mousedown', hideExtendedFilter);
    };
  }, [dispatch, vtdId, tableType, column.extendedFilter, column.index]);

  return (
    <>
      <button
        title="Расширенный фильтр"
        className={classNames('extendedFilterColumn', {
          show: column.extendedFilter.visible,
          activated: column.extendedFilter.prevFilteredRows.length,
        })}
        onMouseDown={showExtendedFilter}
      >
        <FilterAlt />
      </button>
      <div
        className={classNames('extendedFilterPanelWrapper', {
          visibleExtendedFilterWrapper: column.extendedFilter.visible,
          rightDirection,
        })}
        onMouseDown={(e) => e.stopPropagation()}
        ref={extendedFilterPanelWrapperRef}
      >
        {column.extendedFilter.visible && (
          <ExtendedFilterPanel vtdId={vtdId} tableType={tableType} table={table} column={column} />
        )}
      </div>
    </>
  );
};

export default memo(ExtendedFilter);
