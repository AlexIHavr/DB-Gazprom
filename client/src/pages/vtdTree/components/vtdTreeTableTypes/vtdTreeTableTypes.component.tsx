import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { PAGES } from 'widgets';

import { TABLE_TYPES, TABLE_TYPES_KEYS } from '../../../vtdTable/consts/tableTypes';
import { VtdTreeTableTypesProps } from '../../types/props';

const VtdTreeTableTypes: FC<VtdTreeTableTypesProps> = ({ id }) => {
  return (
    <>
      {TABLE_TYPES_KEYS.map((tableType) => (
        <NavLink key={tableType} to={`${PAGES.vtdTable.path}/${id}/${tableType}`}>
          <span>{TABLE_TYPES[tableType].name}</span>
        </NavLink>
      ))}
    </>
  );
};

export default VtdTreeTableTypes;
