import { FC, useState } from 'react';
import classNames from 'classnames';
import globalStyles from 'shared/styles/global.module.scss';

import LoadTableButton from '../loadTableButton/loadTableButton.component';
import { SelectValues } from '../../types/vtdTreeSelect';
import VtdTreeSelect from '../vtdTreeSelect/vtdTreeSelect.component';
import { removeReport, removeVtd } from '../../helpers/serviceManager';

import { getVtdIdBySelectValues } from './../../helpers/getVtdIdBySelectValues';
import useVtdTreeStore from './../../../vtdTree/vtdTree.store';
import styles from './vtdTreeSelectWrapper.module.scss';

const VtdTreeSelectWrapper: FC = () => {
  const vtdTree = useVtdTreeStore((state) => state.vtdTree);
  const [selectValues, setSelectValues] = useState<SelectValues>([]);

  const vtdId = getVtdIdBySelectValues(vtdTree, selectValues);

  const removeReportOnClick = () => {
    if (vtdId) removeReport(vtdId);
  };

  const removeVtdOnClick = () => {
    if (vtdId) removeVtd(vtdId);
  };

  return (
    <div className={styles.vtdTreeSelectWrapper}>
      <VtdTreeSelect selectValues={selectValues} setSelectValues={setSelectValues} />

      <div className={styles.manageVtdButtons}>
        <LoadTableButton vtdId={vtdId} />

        <button className={classNames(globalStyles.btn, styles.removeReport)} onClick={removeReportOnClick} disabled={!vtdId}>
          Удалить отчет
        </button>

        <button className={classNames(globalStyles.btn, styles.removeReport)} onClick={removeVtdOnClick} disabled={!vtdId}>
          Удалить ВТД
        </button>
      </div>
    </div>
  );
};

export default VtdTreeSelectWrapper;
