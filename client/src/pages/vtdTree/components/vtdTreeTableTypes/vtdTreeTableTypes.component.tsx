import { NavLink } from 'react-router-dom';
import { TABLE_TYPES, TABLE_TYPES_KEYS } from 'redux/vtds/constants';
import { PAGES } from 'shared';

type VtdTreeTableTypesProps = {
  id: string;
};

const VtdTreeTableTypes: React.FC<VtdTreeTableTypesProps> = ({ id }) => {
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
