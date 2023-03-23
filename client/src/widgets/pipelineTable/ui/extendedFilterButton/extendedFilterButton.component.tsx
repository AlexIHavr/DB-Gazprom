import classNames from 'classnames';
import { Dispatch, FC, memo, MouseEvent, SetStateAction, useCallback, useRef } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { PipelineTableColumnProps } from 'redux/vtds/types';
import { setColumnProperties } from 'redux/vtds/reducer';

import { ReactComponent as FilterSolid } from '../../assets/svg/filterSolid.svg';

import './extendedFilterButton.styles.scss';

type ExtendedFilterButtonProps = PipelineTableColumnProps & {
  setRightDirection: Dispatch<SetStateAction<boolean>>;
};

const ExtendedFilterButton: FC<ExtendedFilterButtonProps> = ({ table, vtdId, tableType, column, setRightDirection }) => {
  const dispatch = useAppDispatch();
  const extendedFilterButtonRef = useRef<HTMLButtonElement>(null);

  const showExtendedFilter = useCallback(
    (e: MouseEvent) => {
      if (e.button) return;
      e.stopPropagation();

      const addRightOffset = 50;
      const extendedFilterWrapper = extendedFilterButtonRef.current!.nextElementSibling! as HTMLDivElement;
      const leftOffset = extendedFilterWrapper.getBoundingClientRect().left + extendedFilterWrapper.offsetWidth + addRightOffset;

      setRightDirection(leftOffset > document.documentElement.clientWidth);

      const visibleExtendedFilter = table.columns.find(({ extendedFilter: { visible }, id }) => id !== column.id && visible);

      //hide visible extendedFilter
      if (visibleExtendedFilter) {
        dispatch(
          setColumnProperties({
            vtdId,
            tableType,
            columnIndex: visibleExtendedFilter.index,
            properties: {
              extendedFilter: { ...visibleExtendedFilter.extendedFilter, visible: false },
            },
          }),
        );
      }

      //toggle current extendedFilter
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
    [column.extendedFilter, column.id, column.index, table.columns, tableType, vtdId, dispatch, setRightDirection],
  );

  return (
    <button
      title="Расширенный фильтр"
      className={classNames('extendedFilterButton', {
        show: column.extendedFilter.visible,
        activated: column.extendedFilter.checkedUniqueRowsValues.length,
      })}
      onMouseDown={showExtendedFilter}
      ref={extendedFilterButtonRef}
    >
      <FilterSolid />
    </button>
  );
};

export default memo(ExtendedFilterButton);
