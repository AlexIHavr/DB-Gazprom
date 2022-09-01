import { ChangeEvent, useCallback } from 'react';

import { useAppDispatch } from '../../../../hooks/redux';
import { setPipelinesData } from '../../../../redux/vtdTree/thunks';

import './loadVtd.scss';

const LoadVtd: React.FC = () => {
  const dispatch = useAppDispatch();

  const loadExcel = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        dispatch(
          setPipelinesData({
            vtdId: '1',
            file: event.target.files[0],
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <div className="loadVtd">
      <label htmlFor="contained-button-file">
        <input
          id="contained-button-file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          type="file"
          onChange={loadExcel}
        />
        <span className="btn">Загрузить ВТД</span>
      </label>
    </div>
  );
};

export default LoadVtd;
