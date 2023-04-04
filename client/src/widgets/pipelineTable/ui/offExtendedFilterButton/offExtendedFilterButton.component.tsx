import { FC, memo, useCallback } from 'react';

import { OffExtendedFilterButtonProps } from '../../types/props';
import usePipelineTableStore from '../../pipelineTable.store';
import { ReactComponent as FilterOffSolid } from '../../assets/svg/filterOffSolid.svg';

import './offExtendedFilterButton.styles.scss';

const OffExtendedFilterButton: FC<OffExtendedFilterButtonProps> = ({ vtdId, type, index, disabled, filteredRows }) => {
  const [setColumnProperties, setPipelineTableRows] = usePipelineTableStore((state) => [
    state.setColumnProperties,
    state.setPipelineTableRows,
  ]);

  const offExtendedFilterOnClick = useCallback(() => {
    setPipelineTableRows({ vtdId, type, rows: filteredRows });

    setColumnProperties({
      vtdId,
      type,
      index,
      properties: { extendedFilter: { visible: false, checkedUniqueRowsValues: [] } },
    });
  }, [filteredRows, index, setColumnProperties, setPipelineTableRows, type, vtdId]);

  return (
    <button title="Снять фильтр" className="offExtendedFilterButton" disabled={disabled} onClick={offExtendedFilterOnClick}>
      <FilterOffSolid />
    </button>
  );
};

export default memo(OffExtendedFilterButton);
