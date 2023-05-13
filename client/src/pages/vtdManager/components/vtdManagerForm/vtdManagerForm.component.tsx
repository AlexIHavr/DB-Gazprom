import { FC, useRef } from 'react';
import globalStyles from 'shared/styles/global.module.scss';

import VtdTreeSelectWrapper from '../vtdTreeSelectWrapper/vtdTreeSelectWrapper.component';
import { createVtd } from '../../helpers/serviceManager';

import styles from './vtdManagerForm.module.scss';

const VtdManagerForm: FC = () => {
  const formRef = useRef(null);

  const addVtdOnClick = () => {
    if (formRef.current) createVtd(new FormData(formRef.current));
  };

  return (
    <form className={styles.vtdManagerForm} ref={formRef} onSubmit={(e) => e.preventDefault()}>
      <VtdTreeSelectWrapper />
      <button className={globalStyles.btn} onClick={addVtdOnClick}>
        Добавить ВТД
      </button>
    </form>
  );
};

export default VtdManagerForm;
