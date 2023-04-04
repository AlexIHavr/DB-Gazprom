import { ChangeEvent, FC, memo, useCallback } from 'react';
import { usePipelineTableStore } from 'widgets';

import { LoadTableButtonProps } from '../../types/props';
import { SUPPORT_FORMATS_ACCEPT } from '../../consts/supportFormats';

import useVtdTableStore from './../../vtdTable.store';

import './loadTableButton.style.scss';

const LoadTableButton: FC<LoadTableButtonProps> = ({ vtdId, type }) => {
  const loadPipelineTable = useVtdTableStore((state) => state.loadPipelineTable);
  const addPipelineTable = usePipelineTableStore((state) => state.addPipelineTable);

  const loadExcel = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        const pipelineTable = await loadPipelineTable({
          vtdId,
          file: e.target.files[0],
          type,
        });

        if (pipelineTable) addPipelineTable({ vtdId: pipelineTable.vtdId, type: pipelineTable.type });
      }
    },
    [loadPipelineTable, addPipelineTable, type, vtdId],
  );

  return (
    <div className="loadTableButton">
      <label htmlFor="contained-button-file">
        <input id="contained-button-file" accept={SUPPORT_FORMATS_ACCEPT} type="file" name="excelFile" onChange={loadExcel} />
        <span className="btn">Загрузить таблицу</span>
      </label>
    </div>
  );
};

export default memo(LoadTableButton);
