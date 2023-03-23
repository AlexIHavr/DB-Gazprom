import { FC, memo, ReactNode } from 'react';
import { SEARCH_TYPES, SEARCH_TYPES_VALUES } from 'redux/vtds/constants';

import './searchTypeContent.styles.scss';

type SearchTypeContentProps = {
  children?: ReactNode[];
  searchType: SEARCH_TYPES;
};

const SearchTypeContent: FC<SearchTypeContentProps> = ({ children, searchType }) => {
  return (
    <div className="searchTypeContent">
      {children?.find((_, i) => i === SEARCH_TYPES_VALUES.findIndex((value) => value === searchType))}
    </div>
  );
};

export default memo(SearchTypeContent);
