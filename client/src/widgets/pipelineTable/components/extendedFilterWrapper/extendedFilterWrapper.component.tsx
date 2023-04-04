import { FC, memo, useEffect, useState } from 'react';
import classNames from 'classnames';

import { ExtendedFilterProps } from '../../types/props';
import usePipelineTableStore from '../../pipelineTable.store';
import ExtendedFilter from '../extendedFilter/extendedFilter.component';
import ExtendedFilterButton from '../../ui/extendedFilterButton/extendedFilterButton.component';

import './extendedFilterWrapper.styles.scss';

const ExtendedFilterWrapper: FC<ExtendedFilterProps> = ({ table, index, extendedFilter }) => {
  const setColumnProperties = usePipelineTableStore((state) => state.setColumnProperties);
  const [rightDirection, setRightDirection] = useState(false);

  useEffect(() => {
    if (!extendedFilter.visible) return;

    const hideExtendedFilter = () => {
      setColumnProperties({
        vtdId: table.vtdId,
        type: table.type,
        index,
        properties: { extendedFilter: { ...extendedFilter, visible: false } },
      });
    };

    document.addEventListener('mousedown', hideExtendedFilter);
    return () => {
      document.removeEventListener('mousedown', hideExtendedFilter);
    };
  }, [extendedFilter, index, setColumnProperties, table.type, table.vtdId]);

  return (
    <>
      <ExtendedFilterButton
        vtdId={table.vtdId}
        type={table.type}
        columns={table.columns}
        index={index}
        extendedFilter={extendedFilter}
        setRightDirection={setRightDirection}
      />
      <div
        className={classNames('extendedFilterWrapper', {
          visibleExtendedFilterWrapper: extendedFilter.visible,
          rightDirection,
        })}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {extendedFilter.visible && <ExtendedFilter table={table} index={index} extendedFilter={extendedFilter} />}
      </div>
    </>
  );
};

export default memo(ExtendedFilterWrapper);
