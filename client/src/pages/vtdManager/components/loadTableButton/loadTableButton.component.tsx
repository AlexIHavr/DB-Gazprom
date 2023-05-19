import { ChangeEvent, FC, memo } from 'react';
import globalStyles from 'shared/styles/global.module.scss';

import { SUPPORT_FORMATS_ACCEPT } from '../../../vtdTable/consts/supportFormats';
import { createForm, createReport } from '../../helpers/serviceManager';
import { CreateFormParams } from '../../../vtdManager/types/params';

import styles from './loadTableButton.module.scss';

const LoadTableButton: FC<Partial<CreateFormParams>> = ({ vtdId, startKm }) => {
  const loadExcel = async (e: ChangeEvent<HTMLInputElement>) => {
    if (startKm && vtdId && e.target.files?.length) {
      try {
        await createReport(vtdId, e.target.files);
        await createForm({ vtdId, startKm });
        e.target.value = '';
      } catch (error) {
        e.target.value = '';
      }
    }
  };

  return (
    <div className={styles.loadTableButton}>
      <label htmlFor="load-file">
        <input id="load-file" accept={SUPPORT_FORMATS_ACCEPT} type="file" onChange={loadExcel} multiple disabled={!vtdId} />
        <span className={globalStyles.btn}>Загрузить отчет</span>
      </label>
    </div>
  );
};

export default memo(LoadTableButton);
