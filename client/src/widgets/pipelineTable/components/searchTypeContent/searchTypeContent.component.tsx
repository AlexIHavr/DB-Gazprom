import { FC, memo } from 'react';

import { SEARCH_TYPES_VALUES } from '../../consts/searchSettings';
import { SearchTypeContentProps } from '../../types/props';

import './searchTypeContent.styles.scss';

const SearchTypeContent: FC<SearchTypeContentProps> = ({ children, searchType }) => {
  return (
    <div className="searchTypeContent">
      {children?.find((_, i) => i === SEARCH_TYPES_VALUES.findIndex((value) => value === searchType))}
    </div>
  );
};

export default memo(SearchTypeContent);
