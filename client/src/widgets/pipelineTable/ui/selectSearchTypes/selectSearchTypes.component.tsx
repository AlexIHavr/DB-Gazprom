import { Dispatch, FC, memo, SetStateAction } from 'react';
import classNames from 'classnames';
import { SEARCH_TYPES, SEARCH_TYPES_VALUES } from 'redux/vtds/constants';

import { ReactComponent as SearchSolid } from '../../assets/svg/searchSolid.svg';
import { ReactComponent as ArraySolid } from '../../assets/svg/arraySolid.svg';

import './selectSearchTypes.styles.scss';

type SelectSearchTypesProps = {
  searchType: SEARCH_TYPES;
  setSearchType: Dispatch<SetStateAction<SEARCH_TYPES>>;
};

const SelectSearchTypes: FC<SelectSearchTypesProps> = ({ searchType, setSearchType }) => {
  return (
    <div className="selectSearchTypes">
      {SEARCH_TYPES_VALUES.map((searchTypeValue) => (
        <button
          key={searchTypeValue}
          title={searchTypeValue}
          className={classNames({ active: searchType === searchTypeValue })}
          onClick={() => setSearchType(searchTypeValue)}
        >
          {searchTypeValue === SEARCH_TYPES.search ? <SearchSolid /> : <ArraySolid />}
        </button>
      ))}
    </div>
  );
};

export default memo(SelectSearchTypes);
