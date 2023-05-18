import { ChangeEvent, FC, memo } from 'react';
import globalStyles from 'shared/styles/global.module.scss';

import { SUPPORT_FORMATS_ACCEPT } from '../../../vtdTable/consts/supportFormats';
import { LoadTableButtonProps } from '../../../vtdTable/types/props';
import { createForm, createReport } from '../../helpers/serviceManager';

import styles from './loadTableButton.module.scss';

const LoadTableButton: FC<LoadTableButtonProps> = ({ vtdId }) => {
  const loadExcel = async (e: ChangeEvent<HTMLInputElement>) => {
    if (vtdId && e.target.files?.length) {
      await createReport(vtdId, e.target.files);
      await createForm(vtdId);
      e.target.value = '';
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
