import { FC, memo, useCallback } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { setColumnProperties, setPipelineTableProperties } from 'redux/vtds/reducer';
import { PipelineColumnProps, PipelineRows } from 'redux/vtds/types';

import { ReactComponent as FilterOffSolid } from '../../assets/svg/filterOffSolid.svg';

import './offExtendedFilterButton.styles.scss';

type OffExtendedFilterButtonProps = PipelineColumnProps & {
  filteredRows: PipelineRows;
};

const OffExtendedFilterButton: FC<OffExtendedFilterButtonProps> = ({ vtdId, tableType, column, filteredRows }) => {
  const dispatch = useAppDispatch();

  const offExtendedFilterOnClick = useCallback(() => {
    dispatch(setPipelineTableProperties({ vtdId, tableType, properties: { rows: filteredRows } }));

    dispatch(
      setColumnProperties({
        vtdId,
        tableType,
        columnIndex: column.index,
        properties: { extendedFilter: { visible: false, checkedUniqueRowsValues: [] } },
      }),
    );
  }, [dispatch, vtdId, tableType, filteredRows, column.index]);

  return (
    <button
      title="Снять фильтр"
      className="offExtendedFilterButton"
      disabled={!column.extendedFilter.checkedUniqueRowsValues.length}
      onClick={offExtendedFilterOnClick}
    >
      <FilterOffSolid />
    </button>
  );
};

export default memo(OffExtendedFilterButton);
