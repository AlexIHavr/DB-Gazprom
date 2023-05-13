import { FC } from 'react';
import { PAGES } from 'widgets';

import styles from './vtdManager.module.scss';
import VtdManagerForm from './components/vtdManagerForm/vtdManagerForm.component';

const VtdManager: FC = () => {
  return (
    <div className={styles.vtdManager}>
      <h1>{PAGES.vtdManager.name}</h1>
      <VtdManagerForm />
    </div>
  );
};

export default VtdManager;
