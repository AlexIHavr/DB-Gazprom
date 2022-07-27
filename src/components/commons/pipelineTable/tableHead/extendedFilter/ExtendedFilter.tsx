import classNames from 'classnames';
import { IconButton } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';
import { useCallback, useEffect } from 'react';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../redux/vtdTree/types';
import { setColumn } from '../../../../../redux/vtdTree/reducer';
import { useAppDispatch } from '../../../../../hooks/redux';

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
          setColumn({
            vtdId,
            tableType,
            column: {
              ...visibleExtendedFilterColumn,
              extendedFilter: { ...visibleExtendedFilterColumn.extendedFilter, visible: false },
            },
          }),
        );
      }

      dispatch(
        setColumn({
          vtdId,
          tableType,
          column: {
            ...column,
            extendedFilter: { ...column.extendedFilter, visible: !column.extendedFilter.visible },
          },
        }),
      );
    },
    [column, dispatch, table.columns, tableType, vtdId],
  );

  useEffect(() => {
    if (!column.extendedFilter.visible) return;

    const hideExtendedFilter = () => {
      dispatch(
        setColumn({ vtdId, tableType, column: { ...column, extendedFilter: { ...column.extendedFilter, visible: false } } }),
      );
    };

    document.addEventListener('click', hideExtendedFilter);

    return () => {
      document.removeEventListener('click', hideExtendedFilter);
    };
  }, [column, dispatch, vtdId, tableType]);

  return (
    <>
      <IconButton
        title="Расширенный фильтр"
        className={classNames('extendedFilterColumn', { show: column.extendedFilter.visible })}
        onClick={showExtendedFilter}
      >
        <FilterAlt />
      </IconButton>
      <ExtendedFilterPanel vtdId={vtdId} tableType={tableType} table={table} column={column} />
    </>
  );
};

export default ExtendedFilter;
