import { FC, memo } from 'react';
import classNames from 'classnames';
import globalStyles from 'shared/styles/global.module.scss';

import { removeReport, removeVtd, removeVtdTable } from '../../helpers/serviceManager';
import { ADDING_INPUTS } from '../../consts/addingInputs';
import { ManageVtdButtonsProps } from '../../types/props';
import AddVtdButton from '../addVtdButton/addVtdButton.component';

import styles from './manageVtdButtons.module.scss';

const ManageVtdButtons: FC<ManageVtdButtonsProps> = ({ vtdId, formRef, selectValues }) => {
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
      <AddVtdButton vtdId={vtdId} formRef={formRef} selectValues={selectValues} />

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
