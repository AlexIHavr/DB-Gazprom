import classNames from 'classnames';
import { FC, memo, MouseEvent, useCallback, useRef } from 'react';

import { ExtendedFilterButtonProps } from '../../types/props';
import usePipelineTableStore from '../../pipelineTable.store';
import { ReactComponent as FilterSolid } from '../../assets/svg/filterSolid.svg';

import styles from './extendedFilterButton.module.scss';

const ExtendedFilterButton: FC<ExtendedFilterButtonProps> = ({
  vtdId,
  type,
  columns,
  index,
  extendedFilter,
  setRightDirection,
}) => {
  const setColumnProperties = usePipelineTableStore((state) => state.setColumnProperties);
  const extendedFilterButtonRef = useRef<HTMLButtonElement>(null);

  const showExtendedFilter = useCallback(
    (e: MouseEvent) => {
      if (e.button) return;
      e.stopPropagation();

      const addRightOffset = 50;
      const extendedFilterWrapper = extendedFilterButtonRef.current!.nextElementSibling! as HTMLDivElement;
      const leftOffset = extendedFilterWrapper.getBoundingClientRect().left + extendedFilterWrapper.offsetWidth + addRightOffset;

      setRightDirection(leftOffset > document.documentElement.clientWidth);

      const visibleExtendedFilter = columns.find((column) => column.index !== index && column.extendedFilter.visible);

      //hide visible extendedFilter
      if (visibleExtendedFilter) {
        setColumnProperties({
          vtdId,
          type,
          index: visibleExtendedFilter.index,
          properties: { extendedFilter: { ...visibleExtendedFilter.extendedFilter, visible: false } },
        });
      }

      //toggle current extendedFilter
      setColumnProperties({
        vtdId,
        type,
        index,
        properties: {
          extendedFilter: { ...extendedFilter, visible: !extendedFilter.visible },
        },
      });
    },
    [setRightDirection, columns, setColumnProperties, vtdId, type, index, extendedFilter],
  );

  return (
    <button
      title="Расширенный фильтр"
      className={classNames(styles.extendedFilterButton, {
        [styles.show]: extendedFilter.visible,
        [styles.activated]: extendedFilter.checkedUniqueRowsValues.length,
      })}
      onMouseDown={showExtendedFilter}
      ref={extendedFilterButtonRef}
    >
      <FilterSolid />
    </button>
  );
};

export default memo(ExtendedFilterButton);
