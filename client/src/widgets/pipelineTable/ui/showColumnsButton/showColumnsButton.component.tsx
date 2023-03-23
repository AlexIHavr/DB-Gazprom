import { FC, memo, MouseEvent, useCallback, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames';
import { PipelineTableProps } from 'redux/vtds/types';

import { ReactComponent as EyeSolid } from '../../assets/svg/eyeSolid.svg';
import HiddenColumnsManager from '../hiddenColumnsManager/hiddenColumnsManager.component';

const ShowColumnsButton: FC<PipelineTableProps> = ({ table, tableType, vtdId }) => {
  const [showHiddenColumns, setShowVisiblyColumns] = useState(false);

  const hiddenColumns = useMemo(() => table.columns.filter(({ hidden }) => hidden), [table.columns]);

  const showVisiblyColumnsOnClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowVisiblyColumns((prev) => !prev);
  }, []);

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
      className={classNames({ active: showHiddenColumns })}
      onClick={showVisiblyColumnsOnClick}
      disabled={!hiddenColumns.length}
    >
      <EyeSolid />
      <HiddenColumnsManager
        vtdId={vtdId}
        tableType={tableType}
        hiddenColumns={hiddenColumns}
        showHiddenColumns={showHiddenColumns}
        setShowVisiblyColumns={setShowVisiblyColumns}
      />
    </button>
  );
};

export default memo(ShowColumnsButton);
