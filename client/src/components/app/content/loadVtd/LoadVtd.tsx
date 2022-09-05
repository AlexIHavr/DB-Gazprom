import { ChangeEvent, useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../../../../hooks/redux';
import { setPipelineTable } from '../../../../redux/vtdTree/thunks';

import './loadVtd.scss';

const LoadVtd: React.FC = () => {
  const dispatch = useAppDispatch();
  const { vtdTree } = useAppSelector((state) => state.vtdTree);

  const loadExcel = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        dispatch(
          setPipelineTable({
            vtdId: 'bd853592-d18d-4e04-9494-085a7559014f',
            file: event.target.files[0],
            tableType: 'form',
          }),
        );
      }
    },
    [dispatch],
  );

  return (
    <div className="loadVtd">
      <label htmlFor="contained-button-file">
        <div>
          <label htmlFor="select">Тип</label>
          <select id="select">
            <option value="Магистральные">Магистральные</option>
            <option value="Газопроводы-отводы">Газопроводы-отводы</option>
          </select>
        </div>
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
