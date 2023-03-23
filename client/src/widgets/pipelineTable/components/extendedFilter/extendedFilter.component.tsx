import { FC, memo, useMemo, useState } from 'react';
import { SearchCompareTypesValues, PipelineTableColumnProps } from 'redux/vtds/types';
import { SEARCH_TYPES } from 'redux/vtds/constants';

import UniqueRowsValuesWrapper from '../uniqueRowsValuesWrapper/uniqueRowsValuesWrapper.component';
import SearchTypeContent from '../searchTypeContent/searchTypeContent.component';
import OffExtendedFilterButton from '../../ui/offExtendedFilterButton/offExtendedFilterButton.component';
import SelectSearchTypes from '../../ui/selectSearchTypes/selectSearchTypes.component';
import SearchInputs from '../../ui/searchInputs/searchInputs.component';
import RangeInputs from '../../ui/rangeInputs/rangeInputs.component';

import './extendedFilter.styles.scss';

const ExtendedFilter: FC<PipelineTableColumnProps> = ({ vtdId, tableType, table, column }) => {
  const [searchValue, setSearchValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [searchType, setSearchType] = useState(column.extendedFilter.searchType || SEARCH_TYPES.search);
  const [searchCompareTypes, setSearchCompareTypes] = useState<SearchCompareTypesValues>([]);

  const filteredRows = useMemo(() => {
    const columnsWithFilter = table.columns.filter(
      ({ index, extendedFilter }) => index !== column.index && extendedFilter.checkedUniqueRowsValues.length,
    );

    return table.rows.map((row) => ({
      ...row,
      hidden:
        !!columnsWithFilter.length &&
        !columnsWithFilter.every(({ index, extendedFilter: { checkedUniqueRowsValues } }) =>
          checkedUniqueRowsValues.includes(row.cells[index].value),
        ),
    }));
  }, [column.index, table.columns, table.rows]);

  return (
    <div className="extendedFilter">
      <OffExtendedFilterButton vtdId={vtdId} tableType={tableType} column={column} filteredRows={filteredRows} />
      <SelectSearchTypes searchType={searchType} setSearchType={setSearchType} />
      <SearchTypeContent searchType={searchType}>
        <SearchInputs
          column={column}
          searchValue={searchValue}
          searchCompareTypes={searchCompareTypes}
          setSearchValue={setSearchValue}
          setSearchCompareTypes={setSearchCompareTypes}
        />
        <RangeInputs
          column={column}
          fromValue={fromValue}
          toValue={toValue}
          setFromValue={setFromValue}
          setToValue={setToValue}
        />
      </SearchTypeContent>
      <UniqueRowsValuesWrapper
        vtdId={vtdId}
        tableType={tableType}
        filteredRows={filteredRows}
        column={column}
        searchValue={searchValue}
        fromValue={fromValue}
        toValue={toValue}
        searchType={searchType}
        searchCompareTypes={searchCompareTypes}
      />
    </div>
  );
};

export default memo(ExtendedFilter);
