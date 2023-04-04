import classNames from 'classnames';
import { FC, memo, useCallback } from 'react';

import { SEARCH_COMPARE_TYPES, SEARCH_COMPARE_TYPES_VALUES, SEARCH_TYPES } from '../../consts/searchSettings';
import { SearchInputsProps } from '../../types/props';
import { ReactComponent as SpellCheckSolid } from '../../assets/svg/spellcheckSolid.svg';
import { ReactComponent as MatchCaseSolid } from '../../assets/svg/matchCaseSolid.svg';

import './searchInputs.styles.scss';

const SearchInputs: FC<SearchInputsProps> = ({
  columnSearchValue,
  searchValue,
  searchCompareTypes,
  setSearchValue,
  setSearchCompareTypes,
}) => {
  const setCompareTypesOnClick = useCallback(
    (searchCompareType: SEARCH_COMPARE_TYPES) =>
      setSearchCompareTypes((prev) =>
        !prev.includes(searchCompareType) ? [...prev, searchCompareType] : prev.filter((value) => value !== searchCompareType),
      ),
    [setSearchCompareTypes],
  );

  return (
    <div className="searchInput">
      <input
        placeholder={columnSearchValue || SEARCH_TYPES.search}
        type="search"
        onChange={(e) => setSearchValue(e.target.value)}
        value={searchValue}
      />

      {SEARCH_COMPARE_TYPES_VALUES.map((searchCompareType) => (
        <button
          key={searchCompareType}
          title={searchCompareType}
          className={classNames({ active: searchCompareTypes.includes(searchCompareType) })}
          onClick={() => setCompareTypesOnClick(searchCompareType)}
        >
          {searchCompareType === SEARCH_COMPARE_TYPES.matchCase ? <MatchCaseSolid /> : <SpellCheckSolid />}
        </button>
      ))}
    </div>
  );
};

export default memo(SearchInputs);
