import { FC, memo } from 'react';

import { OffExtendedFilterButtonProps } from '../../types/props';
import usePipelineTableStore from '../../pipelineTable.store';
import { ReactComponent as FilterOffSolid } from '../../assets/svg/filterOffSolid.svg';

import styles from './offExtendedFilterButton.module.scss';

const OffExtendedFilterButton: FC<OffExtendedFilterButtonProps> = ({ vtdId, type, index, disabled, filteredRows }) => {
  const [setColumnProperties, setPipelineTableRows] = usePipelineTableStore((state) => [
    state.setColumnProperties,
    state.setPipelineTableRows,
  ]);

  const offExtendedFilterOnClick = () => {
    setPipelineTableRows({ vtdId, type, rows: filteredRows });

    setColumnProperties({
      vtdId,
      type,
      index,
      properties: { extendedFilter: { visible: false, checkedUniqueRowsValues: [] } },
    });
  };

  return (
    <button
      title="Снять фильтр"
      className={styles.offExtendedFilterButton}
      disabled={disabled}
      onClick={offExtendedFilterOnClick}
    >
      <FilterOffSolid />
    </button>
  );
};

export default memo(OffExtendedFilterButton);
