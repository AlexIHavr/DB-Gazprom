import { FC, memo, MouseEvent, useCallback } from 'react';

import { HideColumnButtonProps } from '../../types/props';
import usePipelineTableStore from '../../pipelineTable.store';
import { ReactComponent as EyeSlashSolid } from '../../assets/svg/eyeOffSolid.svg';

import styles from './hideColumnButton.module.scss';

const HideColumnButton: FC<HideColumnButtonProps> = ({ vtdId, type, index }) => {
  const setColumnProperties = usePipelineTableStore((state) => state.setColumnProperties);

  const hideColumnOnMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button) return;
      setColumnProperties({ vtdId, type, index, properties: { hidden: true } });
    },
    [index, setColumnProperties, type, vtdId],
  );

  return (
    <button title="Скрыть колонку" className={styles.hideColumnButton} onMouseDown={hideColumnOnMouseDown}>
      <EyeSlashSolid />
    </button>
  );
};

export default memo(HideColumnButton);
