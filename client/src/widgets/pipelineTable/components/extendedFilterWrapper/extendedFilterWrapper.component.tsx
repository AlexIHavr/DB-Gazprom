import { FC, memo, useEffect, useState } from 'react';
import classNames from 'classnames';
import { PipelineTableColumnProps } from 'redux/vtds/types';
import { useAppDispatch } from 'hooks/redux';
import { setColumnProperties } from 'redux/vtds/reducer';

import ExtendedFilter from '../extendedFilter/extendedFilter.component';
import ExtendedFilterButton from '../../ui/extendedFilterButton/extendedFilterButton.component';

import './extendedFilterWrapper.styles.scss';

const ExtendedFilterWrapper: FC<PipelineTableColumnProps> = ({ table, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();
  const [rightDirection, setRightDirection] = useState(false);

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
      <ExtendedFilterButton
        table={table}
        vtdId={vtdId}
        tableType={tableType}
        column={column}
        setRightDirection={setRightDirection}
      />
      <div
        className={classNames('extendedFilterWrapper', {
          visibleExtendedFilterWrapper: column.extendedFilter.visible,
          rightDirection,
        })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {column.extendedFilter.visible && <ExtendedFilter vtdId={vtdId} tableType={tableType} table={table} column={column} />}
      </div>
    </>
  );
};

export default memo(ExtendedFilterWrapper);
