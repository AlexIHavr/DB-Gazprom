import classNames from 'classnames';
import { FC, memo, MouseEvent } from 'react';

import { HiddenColumnsManagerProps } from '../../types/props';
import { ReactComponent as EyeRegular } from '../../assets/svg/eyeRegular.svg';

import usePipelineTableStore from './../../pipelineTable.store';
import styles from './hiddenColumnsManager.module.scss';

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

  const showColumnOnClick = (e: MouseEvent<HTMLDivElement>, index: number) => {
    e.stopPropagation();

    setColumnProperties({ vtdId, type, index, properties: { hidden: false } });
    if (hiddenColumns.length === 1) setShowVisiblyColumns(false);
  };

  const showAllColumnsOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setColumnsProperties({ vtdId, type, properties: { hidden: false } });
    setShowVisiblyColumns(false);
  };

  return (
    <div className={classNames(styles.hiddenColumnsManager, { [styles.showHiddenColumnsManager]: showHiddenColumns })}>
      {showHiddenColumns && (
        <>
          {hiddenColumns.map(({ id, value, index }) => (
            <div key={id} onClick={(e) => showColumnOnClick(e, index)}>
              <EyeRegular />
              <span>{value}</span>
            </div>
          ))}
          <div className={styles.showAllColumns} onClick={showAllColumnsOnClick}>
            <span>Показать все</span>
          </div>
        </>
      )}
    </div>
  );
};

export default memo(HiddenColumnsManager);
