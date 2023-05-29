import { FC } from 'react';

import { TABLE_TYPES_VALUES } from '../../../vtdTable/consts/tableTypes';
import { ADDING_INPUTS } from '../../consts/addingInputs';

import styles from './deletingTablesSelect.module.scss';

const DeletingTablesSelect: FC = () => {
  return (
    <div className={styles.deletingTablesSelect}>
      <h2>Таблица для удаления</h2>
      <input type="text" name={ADDING_INPUTS.deletingTable.name} list="deletingTable" />
      <datalist id="deletingTable">
        {TABLE_TYPES_VALUES.map(({ name }) => (
          <option key={name}>{name}</option>
        ))}
      </datalist>
    </div>
  );
};

export default DeletingTablesSelect;
