import classNames from 'classnames';
import { FC, memo, MouseEvent, useCallback } from 'react';

import { HiddenColumnsManagerProps } from '../../types/props';
import { ReactComponent as EyeRegular } from '../../assets/svg/eyeRegular.svg';

import usePipelineTableStore from './../../pipelineTable.store';

import './hiddenColumnsManager.styles.scss';

const HiddenColumnsManager: FC<HiddenColumnsManagerProps> = ({
  vtdId,
  type,
  hiddenColumns,
  showHiddenColumns,
  setShowVisiblyColumns,
}) => {
  const [setColumnProperties, setColumnsProperties] = usePipelineTableStore((state) => [
    state.setColumnProperties,
    state.setColumnsProperties,
  ]);

  const showColumnOnClick = useCallback(
    (e: MouseEvent<HTMLDivElement>, index: number) => {
      e.stopPropagation();
      setColumnProperties({ vtdId, type, index, properties: { hidden: false } });
      if (hiddenColumns.length === 1) setShowVisiblyColumns(false);
    },
    [hiddenColumns.length, setColumnProperties, setShowVisiblyColumns, type, vtdId],
  );

  const showAllColumnsOnClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      setColumnsProperties({ vtdId, type, properties: { hidden: false } });
      setShowVisiblyColumns(false);
    },
    [setColumnsProperties, setShowVisiblyColumns, type, vtdId],
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
