import classNames from 'classnames';
import { FilterAlt } from '@mui/icons-material';
import { useCallback, useEffect } from 'react';

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

  const showExtendedFilter = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

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

    document.addEventListener('click', hideExtendedFilter);

    return () => {
      document.removeEventListener('click', hideExtendedFilter);
    };
  }, [dispatch, vtdId, tableType, column.extendedFilter, column.index]);

  return (
    <>
      <button
        title="Расширенный фильтр"
        className={classNames('extendedFilterColumn', { show: column.extendedFilter.visible })}
        onClick={showExtendedFilter}
      >
        <FilterAlt />
      </button>
      <ExtendedFilterPanel vtdId={vtdId} tableType={tableType} table={table} column={column} />
    </>
  );
};

export default ExtendedFilter;
