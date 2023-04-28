import { ChangeEvent, FC, memo } from 'react';
import globalStyles from 'shared/styles/global.module.scss';

import { GetVtdTableParams } from '../../types/params';
import { SUPPORT_FORMATS_ACCEPT } from '../../consts/supportFormats';

import useVtdTableStore from './../../vtdTable.store';
import styles from './loadTableButton.module.scss';

const LoadTableButton: FC<GetVtdTableParams> = ({ vtdId, type }) => {
  const createVtdTable = useVtdTableStore((state) => state.createVtdTable);

  const loadExcel = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      await createVtdTable({ vtdId, type, file: e.target.files[0] });
    }
  };

  return (
    <div className={styles.loadTableButton}>
      <label htmlFor="load-file">
        <input id="load-file" accept={SUPPORT_FORMATS_ACCEPT} type="file" onChange={loadExcel} />
        <span className={globalStyles.btn}>Загрузить таблицу</span>
      </label>
    </div>
  );
};

export default memo(LoadTableButton);
