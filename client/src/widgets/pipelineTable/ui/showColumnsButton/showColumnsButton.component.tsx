import { FC, memo, MouseEvent, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';

import { ReactComponent as EyeSolid } from '../../assets/svg/eyeSolid.svg';
import HiddenColumnsManager from '../hiddenColumnsManager/hiddenColumnsManager.component';
import { ShowColumnsButtonProps } from '../../types/props';
import pipelineTableStyles from '../../pipelineTable.module.scss';

const ShowColumnsButton: FC<ShowColumnsButtonProps> = ({ vtdId, type, columns }) => {
  const [showHiddenColumns, setShowVisiblyColumns] = useState(false);

  const hiddenColumns = useMemo(() => columns.filter(({ hidden }) => hidden), [columns]);

  const showVisiblyColumnsOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowVisiblyColumns((prev) => !prev);
  };

  useEffect(() => {
    if (!showHiddenColumns) return;

    const hideVisibleColumns = () => setShowVisiblyColumns(false);

    document.addEventListener('click', hideVisibleColumns);

    return () => {
      document.removeEventListener('click', hideVisibleColumns);
    };
  }, [showHiddenColumns]);

  return (
    <button
      title="Показать колонку"
      className={classNames({ [pipelineTableStyles.active]: showHiddenColumns })}
      onClick={showVisiblyColumnsOnClick}
      disabled={!hiddenColumns.length}
    >
      <EyeSolid />
      <HiddenColumnsManager
        vtdId={vtdId}
        type={type}
        hiddenColumns={hiddenColumns}
        showHiddenColumns={showHiddenColumns}
        setShowVisiblyColumns={setShowVisiblyColumns}
      />
    </button>
  );
};

export default memo(ShowColumnsButton);
