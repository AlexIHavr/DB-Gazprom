import { FC, memo, useMemo, useState } from 'react';

import UniqueRowsValuesWrapper from '../uniqueRowsValuesWrapper/uniqueRowsValuesWrapper.component';
import SearchTypeContent from '../searchTypeContent/searchTypeContent.component';
import OffExtendedFilterButton from '../../ui/offExtendedFilterButton/offExtendedFilterButton.component';
import SelectSearchTypes from '../../ui/selectSearchTypes/selectSearchTypes.component';
import SearchInputs from '../../ui/searchInputs/searchInputs.component';
import RangeInputs from '../../ui/rangeInputs/rangeInputs.component';
import { ExtendedFilterProps } from '../../types/props';
import { SEARCH_TYPES } from '../../consts/searchSettings';
import { SearchCompareTypesValues } from '../../types/pipelineTable';

import styles from './extendedFilter.module.scss';

const ExtendedFilter: FC<ExtendedFilterProps> = ({ table, index, extendedFilter }) => {
  const [searchValue, setSearchValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [searchType, setSearchType] = useState(extendedFilter.searchType || SEARCH_TYPES.search);
  const [searchCompareTypes, setSearchCompareTypes] = useState<SearchCompareTypesValues>([]);

  const filteredRows = useMemo(() => {
    const columnsWithFilter = table.columns.filter(
      (column) => index !== column.index && column.extendedFilter.checkedUniqueRowsValues.length,
    );

    return table.rows.map((row) => ({
      ...row,
      hidden:
        !!columnsWithFilter.length &&
        !columnsWithFilter.every(({ index, extendedFilter: { checkedUniqueRowsValues } }) =>
          checkedUniqueRowsValues.includes(row.cells[index].value),
        ),
    }));
  }, [index, table.columns, table.rows]);

  return (
    <div className={styles.extendedFilter}>
      <OffExtendedFilterButton
        vtdId={table.vtdId}
        type={table.type}
        index={index}
        disabled={!extendedFilter.checkedUniqueRowsValues.length}
        filteredRows={filteredRows}
      />
      <SelectSearchTypes searchType={searchType} setSearchType={setSearchType} />
      <SearchTypeContent searchType={searchType}>
        <SearchInputs
          columnSearchValue={extendedFilter.searchValue}
          searchValue={searchValue}
          searchCompareTypes={searchCompareTypes}
          setSearchValue={setSearchValue}
          setSearchCompareTypes={setSearchCompareTypes}
        />
        <RangeInputs
          columnFromValue={extendedFilter.fromValue}
          columnToValue={extendedFilter.toValue}
          fromValue={fromValue}
          toValue={toValue}
          setFromValue={setFromValue}
          setToValue={setToValue}
        />
      </SearchTypeContent>
      <UniqueRowsValuesWrapper
        vtdId={table.vtdId}
        type={table.type}
        index={index}
        columnCheckedUniqueRowsValues={extendedFilter.checkedUniqueRowsValues}
        filteredRows={filteredRows}
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
