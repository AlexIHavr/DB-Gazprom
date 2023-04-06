import { FC, memo } from 'react';
import classNames from 'classnames';

import { SelectSearchTypesProps } from '../../types/props';
import { ReactComponent as SearchSolid } from '../../assets/svg/searchSolid.svg';
import { ReactComponent as ArraySolid } from '../../assets/svg/arraySolid.svg';
import { SEARCH_TYPES, SEARCH_TYPES_VALUES } from '../../consts/searchSettings';
import pipelineTableStyles from '../../pipelineTable.module.scss';

import styles from './selectSearchTypes.module.scss';

const SelectSearchTypes: FC<SelectSearchTypesProps> = ({ searchType, setSearchType }) => {
  return (
    <div className={styles.selectSearchTypes}>
      {SEARCH_TYPES_VALUES.map((searchTypeValue) => (
        <button
          key={searchTypeValue}
          title={searchTypeValue}
          className={classNames({ [pipelineTableStyles.active]: searchType === searchTypeValue })}
          onClick={() => setSearchType(searchTypeValue)}
        >
          {searchTypeValue === SEARCH_TYPES.search ? <SearchSolid /> : <ArraySolid />}
        </button>
      ))}
    </div>
  );
};

export default memo(SelectSearchTypes);
