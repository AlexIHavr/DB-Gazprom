import { FC, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import globalStyles from 'shared/styles/global.module.scss';

import { createVtd, removeReport, removeVtd } from '../../helpers/serviceManager';
import useVtdTreeStore from '../../../vtdTree/vtdTree.store';
import { getVtdIdBySelectValues } from '../../helpers/getVtdIdBySelectValues';
import VtdTreeSelect from '../vtdTreeSelect/vtdTreeSelect.component';
import LoadTableButton from '../loadTableButton/loadTableButton.component';
import { SelectValues } from '../../../vtdManager/types/vtdTreeSelect';

import styles from './vtdManagerForm.module.scss';

const VtdManagerForm: FC = () => {
  const formRef = useRef(null);

  const [vtdTree, vtds] = useVtdTreeStore((state) => [state.vtdTree, state.vtds]);
  const [selectValues, setSelectValues] = useState<SelectValues>([]);

  const vtdId = useMemo(() => getVtdIdBySelectValues(vtdTree, selectValues), [selectValues, vtdTree]);
  const startKm = useMemo(() => vtds.find(({ id }) => id === vtdId)?.section.split('-')[0], [vtdId, vtds]);

  const removeReportOnClick = () => {
    if (vtdId) removeReport(vtdId);
  };

  const removeVtdOnClick = () => {
    if (vtdId) removeVtd(vtdId);
  };

  const addVtdOnClick = () => {
    if (formRef.current) createVtd(new FormData(formRef.current));
  };

  return (
    <form className={styles.vtdManagerForm} ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <div className={styles.vtdTreeSelectWrapper}>
        <VtdTreeSelect selectValues={selectValues} setSelectValues={setSelectValues} />

        <div className={styles.manageVtdButtons}>
          <LoadTableButton vtdId={vtdId} startKm={startKm} />

          <button className={classNames(globalStyles.btn, styles.removeReport)} onClick={removeReportOnClick} disabled={!vtdId}>
            Удалить отчет
          </button>

          <button className={globalStyles.btn} onClick={addVtdOnClick} disabled={!!vtdId}>
            Добавить ВТД
          </button>

          <button className={classNames(globalStyles.btn, styles.removeReport)} onClick={removeVtdOnClick} disabled={!vtdId}>
            Удалить ВТД
          </button>
        </div>
      </div>
    </form>
  );
};

export default VtdManagerForm;
