import classNames from 'classnames';
import { useCallback, useMemo } from 'react';
import { BrowserNotSupported, Crop32Outlined, DataArray } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';

import { useAppDispatch } from '../../../../../../../hooks/redux';
import { SEARCH_TYPES } from '../../../../../../../redux/vtdTree/constants';
import { setColumnProperties } from '../../../../../../../redux/vtdTree/reducer';
import { PipelineColumn, PipelineDataTables } from '../../../../../../../redux/vtdTree/types';

type SearchTypeProps = {
  searchType: SEARCH_TYPES;
  vtdId: string;
  tableType: PipelineDataTables;
  column: PipelineColumn;
};

const SearchType: React.FC<SearchTypeProps> = ({ searchType, vtdId, tableType, column }) => {
  const dispatch = useAppDispatch();

  const setSearchTypeOnClick = useCallback(() => {
    dispatch(
      setColumnProperties({
        vtdId,
        tableType,
        columnIndex: column.index,
        properties: { extendedFilter: { ...column.extendedFilter, searchType } },
      }),
    );
  }, [column.extendedFilter, column.index, dispatch, tableType, searchType, vtdId]);

  const searchTypeIcon = useMemo(() => {
    switch (searchType) {
      case SEARCH_TYPES.search:
        return <SearchIcon />;
      case SEARCH_TYPES.range:
        return <DataArray />;
      case SEARCH_TYPES.empty:
        return <Crop32Outlined />;
      case SEARCH_TYPES.notEmpty:
      default:
        return <BrowserNotSupported />;
    }
  }, [searchType]);

  return (
    <button
      title={searchType}
      className={classNames({ active: column.extendedFilter.searchType === searchType })}
      onClick={setSearchTypeOnClick}
    >
      {searchTypeIcon}
    </button>
  );
};

export default SearchType;
