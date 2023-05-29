import { FC, memo, useMemo } from 'react';
import classNames from 'classnames';
import globalStyles from 'shared/styles/global.module.scss';

import { createForm, createReport, createVtd, removeReport, removeVtd, removeVtdTable } from '../../helpers/serviceManager';
import { ADDING_INPUTS, FILE_INPUTS } from '../../consts/addingInputs';
import useVtdTreeStore from '../../../vtdTree/vtdTree.store';
import { ManageVtdButtonsProps } from '../../types/props';
import { getStartKm } from '../../helpers/getStartKm';

import styles from './manageVtdButtons.module.scss';

const ManageVtdButtons: FC<ManageVtdButtonsProps> = ({ vtdId, formRef }) => {
  const vtds = useVtdTreeStore((state) => state.vtds);

  let startKm = useMemo(() => {
    const vtd = vtds.find(({ id }) => id === vtdId);
    if (vtd) return getStartKm(vtd);
  }, [vtdId, vtds]);

  const addVtdOnClick = async () => {
    const formData = new FormData(formRef.current!);

    if (!vtdId) {
      const vtd = await createVtd(formData);

      vtdId = vtd.id;
      startKm = getStartKm(vtd);
    }

    if (startKm && vtdId) {
      await createReport(vtdId, formData.getAll(FILE_INPUTS.report.name) as File[]);
      await createForm({ vtdId, startKm });
    }
  };

  const removeVtdOnClick = async () => {
    if (vtdId) {
      await removeReport(vtdId);
      await removeVtd(vtdId);
    }
  };

  const removeVtdTableOnClick = async () => {
    if (vtdId) {
      const formData = new FormData(formRef.current!);
      await removeVtdTable(vtdId, formData.get(ADDING_INPUTS.deletingTable.name) as string);
    }
  };

  return (
    <div className={styles.manageVtdButtons}>
      <button className={globalStyles.btn} onClick={addVtdOnClick}>
        Добавить ВТД
      </button>

      <button className={classNames(globalStyles.btn, styles.removeReport)} onClick={removeVtdOnClick} disabled={!vtdId}>
        Удалить ВТД
      </button>

      <button className={classNames(globalStyles.btn, styles.removeReport)} onClick={removeVtdTableOnClick} disabled={!vtdId}>
        Удалить таблицу
      </button>
    </div>
  );
};

export default memo(ManageVtdButtons);
