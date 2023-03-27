import { ChangeEvent, FC, memo, useCallback } from 'react';
import { PipelineTableTypeProps } from 'redux/vtds/types';
import { SUPPORT_FORMATS_ACCEPT } from 'shared/consts/excel';

import useVtdTableStore from './../../vtdTable.store';

import './loadTableButton.style.scss';

const LoadTableButton: FC<PipelineTableTypeProps> = ({ vtdId, tableType }) => {
  const loadPipelineTable = useVtdTableStore((state) => state.loadPipelineTable);

  const loadExcel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        loadPipelineTable({
          vtdId,
          file: e.target.files[0],
          tableType,
        });
      }
    },
    [loadPipelineTable, vtdId, tableType],
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
