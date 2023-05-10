import { ChangeEvent, FC, memo } from 'react';
import globalStyles from 'shared/styles/global.module.scss';

import { SUPPORT_FORMATS_ACCEPT } from '../../consts/supportFormats';

import { LoadTableButtonProps } from './../../types/props';
import useVtdTableStore from './../../vtdTable.store';
import styles from './loadTableButton.module.scss';

const LoadTableButton: FC<LoadTableButtonProps> = ({ vtdId }) => {
  const createReport = useVtdTableStore((state) => state.createReport);

  const loadExcel = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      await createReport({ vtdId, files: e.target.files });
    }
  };

  return (
    <div className={styles.loadTableButton}>
      <label htmlFor="load-file">
        <input id="load-file" accept={SUPPORT_FORMATS_ACCEPT} type="file" onChange={loadExcel} multiple />
        <span className={globalStyles.btn}>Загрузить таблицу</span>
      </label>
    </div>
  );
};

export default memo(LoadTableButton);
