import classNames from 'classnames';
import { useAppDispatch } from 'hooks/redux';
import { Dispatch, FC, memo, MouseEvent, SetStateAction, useCallback } from 'react';
import { setColumnProperties, setColumnsProperties } from 'redux/vtds/reducer';
import { PipelineColumns, PipelineTableTypeProps } from 'redux/vtds/types';

import { ReactComponent as EyeRegular } from '../../assets/svg/eyeRegular.svg';

import './hiddenColumnsManager.styles.scss';

type HiddenColumnsManagerProps = PipelineTableTypeProps & {
  hiddenColumns: PipelineColumns;
  showHiddenColumns: boolean;
  setShowVisiblyColumns: Dispatch<SetStateAction<boolean>>;
};

const HiddenColumnsManager: FC<HiddenColumnsManagerProps> = ({
  vtdId,
  tableType,
  hiddenColumns,
  showHiddenColumns,
  setShowVisiblyColumns,
}) => {
  const dispatch = useAppDispatch();

  const showColumnOnClick = useCallback(
    (e: MouseEvent<HTMLDivElement>, columnIndex: number) => {
      e.stopPropagation();
      dispatch(setColumnProperties({ vtdId, tableType, columnIndex, properties: { hidden: false } }));
      if (hiddenColumns.length === 1) setShowVisiblyColumns(false);
    },
    [dispatch, hiddenColumns.length, setShowVisiblyColumns, tableType, vtdId],
  );

  const showAllColumnsOnClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      dispatch(setColumnsProperties({ vtdId, tableType, properties: { hidden: false } }));
      setShowVisiblyColumns(false);
    },
    [dispatch, setShowVisiblyColumns, tableType, vtdId],
  );

  return (
    <div className={classNames('hiddenColumnsManager', { showHiddenColumnsManager: showHiddenColumns })}>
      {showHiddenColumns && (
        <>
          {hiddenColumns.map(({ id, value, index }) => (
            <div key={id} onClick={(e) => showColumnOnClick(e, index)}>
              <EyeRegular />
              <span>{value}</span>
            </div>
          ))}
          <div className="showAllColumns" onClick={showAllColumnsOnClick}>
            <span>Показать все</span>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(HiddenColumnsManager);
