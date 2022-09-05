import { ChangeEvent, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch } from '../../../../hooks/redux';
import { setPipelineTable } from '../../../../redux/vtds/thunks';
import { PAGES } from '../../constants';

import './loadVtd.scss';

const LoadVtd: React.FC = () => {
  const dispatch = useAppDispatch();
  const { [PAGES.loadVtd.param]: vtdId } = useParams();

  const loadExcel = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (vtdId && e.target.files?.length) {
        dispatch(
          setPipelineTable({
            vtdId,
            file: e.target.files[0],
            tableType: 'form',
          }),
        );
      }
    },
    [dispatch, vtdId],
  );

  return (
    <div className="loadVtd">
      <label htmlFor="contained-button-file">
        <input
          id="contained-button-file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          name="excelFile"
          onChange={loadExcel}
        />
        <span className="btn">Загрузить ВТД</span>
      </label>
    </div>
  );
};

export default LoadVtd;
