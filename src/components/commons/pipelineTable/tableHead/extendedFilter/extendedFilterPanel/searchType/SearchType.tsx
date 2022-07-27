import { IconButton } from '@mui/material';
import classNames from 'classnames';
import { useCallback } from 'react';

import { useAppDispatch } from '../../../../../../../hooks/redux';
import { SEARCH_TYPES } from '../../../../../../../redux/vtdTree/constants';
import { setColumn } from '../../../../../../../redux/vtdTree/reducer';
import { PipelineColumn, PipelineDataTables } from '../../../../../../../redux/vtdTree/types';

type SearchTypeProps = {
  title: string;
  type: SEARCH_TYPES;
  icon: React.ReactElement;
  vtdId: string;
  tableType: PipelineDataTables;
  column: PipelineColumn;
};

const SearchType: React.FC<SearchTypeProps> = ({ title, type, icon, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const setSearchTypeOnClick = useCallback(() => {
    dispatch(
      setColumn({
        vtdId,
        tableType,
        column: { ...column, extendedFilter: { ...column.extendedFilter, type } },
      }),
    );
  }, [column, dispatch, tableType, type, vtdId]);

  return (
    <IconButton
      title={title}
      className={classNames({ active: column.extendedFilter.type === type })}
      onClick={setSearchTypeOnClick}
    >
      {icon}
    </IconButton>
  );
};

export default SearchType;
