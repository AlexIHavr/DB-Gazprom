import { FC, memo, MouseEvent, useCallback } from 'react';
import { useAppDispatch } from 'hooks/redux';
import { setColumnProperties } from 'redux/vtds/reducer';
import { PipelineColumnProps } from 'redux/vtds/types';

import { ReactComponent as EyeSlashSolid } from '../../assets/svg/eyeOffSolid.svg';

import './hideColumnButton.styles.scss';

const HideColumnButton: FC<PipelineColumnProps> = ({ vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const hideColumnOnMouseDown = useCallback(
    (e: MouseEvent) => {
      if (e.button || !vtdId || !tableType) return;
      dispatch(setColumnProperties({ vtdId, tableType, columnIndex: column.index, properties: { hidden: true } }));
    },
    [dispatch, vtdId, tableType, column.index],
  );

  return (
    <button title="Скрыть колонку" className="hideColumnButton" onMouseDown={hideColumnOnMouseDown}>
      <EyeSlashSolid />
    </button>
  );
};

export default memo(HideColumnButton);
