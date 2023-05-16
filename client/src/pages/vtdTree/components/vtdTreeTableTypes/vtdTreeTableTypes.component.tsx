import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import { PAGES } from 'widgets';

import { VtdTreeTableTypesProps } from '../../types/props';
import { TABLE_TYPE_GROUPS_VALUES } from '../../../vtdTable/consts/tableTypeGroups';
import { TABLE_TYPES_ENTRIES } from '../../../vtdTable/consts/tableTypes';

import styles from './vtdTreeTableTypes.module.scss';

const VtdTreeTableTypes: FC<VtdTreeTableTypesProps> = ({ id }) => {
  return (
    <div className={styles.vtdTreeTableTypes}>
      {TABLE_TYPE_GROUPS_VALUES.map((group) => (
        <div key={group} className={styles.vtdTreeTableTypesGroup}>
          <h4>{group}</h4>
          {TABLE_TYPES_ENTRIES.filter(([, { groupName }]) => groupName === group).map(([type, { name }]) => (
            <NavLink key={type} to={`${PAGES.vtdTable.path}/${id}/${type}`}>
              <span>{name}</span>
            </NavLink>
          ))}
        </div>
      ))}
    </div>
  );
};

export default memo(VtdTreeTableTypes);
