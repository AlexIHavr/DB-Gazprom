import { Button } from '@mui/material';
import { ChangeEvent, useCallback } from 'react';

import { excelRenderer } from '../../../../helpers/excel';
import { useAppDispatch } from '../../../../hooks/redux';
import { setIsLoading } from '../../../../redux/app/reducer';
import { setPipelinesData } from '../../../../redux/vtdTree/reducer';

import './loadVtd.scss';

const LoadVtd: React.FC = () => {
  const dispatch = useAppDispatch();

  const loadExcel = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files?.length) {
        const fileObj = event.target.files[0];

        dispatch(setIsLoading(true));

        //КАСТЫЛЬ
        setTimeout(async () => {
          try {
            const data = await excelRenderer(fileObj);
            dispatch(
              setPipelinesData({
                vtdId: '1',
                data: {
                  form: data,
                },
              }),
            );
          } catch (err) {
            console.log(err);
          }

          dispatch(setIsLoading(false));
        }, 500);
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
        <Button variant="contained" component="span">
          Загрузить ВТД
        </Button>
      </label>
    </div>
  );
};

export default LoadVtd;
