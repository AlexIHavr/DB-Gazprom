import { ChangeEvent, memo, useCallback } from 'react';

import { useAppDispatch } from '../../../hooks/redux';
import { setPipelineTable } from '../../../redux/vtds/thunks';
import { TableType } from '../../../redux/vtds/types';

import './loadTable.scss';

type LoadTableProps = {
  vtdId: string;
  tableType: TableType;
};

const LoadTable: React.FC<LoadTableProps> = ({ vtdId, tableType }) => {
  const dispatch = useAppDispatch();

  const loadExcel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.length) {
        dispatch(
          setPipelineTable({
            vtdId,
            file: e.target.files[0],
            tableType,
          }),
        );
      }
    },
    [dispatch, vtdId, tableType],
  );

  return (
    <div className="loadTable">
      <label htmlFor="contained-button-file">
        <input
          id="contained-button-file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          name="excelFile"
          onChange={loadExcel}
        />
        <span className="btn">Загрузить таблицу</span>
      </label>
    </div>
  );
};

export default memo(LoadTable);
