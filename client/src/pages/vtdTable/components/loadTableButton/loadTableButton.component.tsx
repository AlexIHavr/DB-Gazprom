import { ChangeEvent, FC, memo, useCallback } from 'react';
import { usePipelineTableStore } from 'widgets';
import globalStyles from 'shared/styles/global.module.scss';

import { LoadTableButtonProps } from '../../types/props';
import { SUPPORT_FORMATS_ACCEPT } from '../../consts/supportFormats';

import useVtdTableStore from './../../vtdTable.store';
import styles from './loadTableButton.module.scss';

const LoadTableButton: FC<LoadTableButtonProps> = ({ vtdId, type }) => {
  const loadPipelineTable = useVtdTableStore((state) => state.loadPipelineTable);
  const addPipelineTable = usePipelineTableStore((state) => state.addPipelineTable);

  const loadExcel = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const pipelineTable = await loadPipelineTable({ vtdId, type, file: e.target.files[0] });

        if (pipelineTable) addPipelineTable({ vtdId: pipelineTable.vtdId, type: pipelineTable.type });
      }
    },
    [loadPipelineTable, addPipelineTable, type, vtdId],
  );

  return (
    <div className={styles.loadTableButton}>
      <label htmlFor="load-file">
        <input id="load-file" accept={SUPPORT_FORMATS_ACCEPT} type="file" onChange={loadExcel} />
        <span className={globalStyles.btn}>Загрузить таблицу</span>
      </label>
    </div>
  );
};

export default memo(LoadTableButton);
