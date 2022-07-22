import { FilterAlt } from '@mui/icons-material';
import { IconButton } from '@mui/material';

import './extendedFilter.scss';

const ExtendedFilter = () => {
  return (
    <IconButton title="Расширенный фильтр" className="filterColumn">
      <FilterAlt />
    </IconButton>
  );
};

export default ExtendedFilter;
