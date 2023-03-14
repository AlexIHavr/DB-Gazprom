import { memo, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';
import { PipelineColumn, TableType, PipelineTable } from 'redux/vtds/types';
import { SEARCH_COMPARE_TYPES, SEARCH_COMPARE_TYPES_VALUES, SEARCH_TYPES, SEARCH_TYPES_VALUES } from 'redux/vtds/constants';
import { isRangeComparedCellValue, isSearchComparedCellValue } from 'shared/helpers/pipelineTable';
import { setColumnProperties, setPipelineTableProperties } from 'redux/vtds/reducer';
import { ReactComponent as FilterOffSolid } from 'assets/svg/filterOffSolid.svg';
import { ReactComponent as SearchSolid } from 'assets/svg/searchSolid.svg';
import { ReactComponent as ArraySolid } from 'assets/svg/arraySolid.svg';
import { ReactComponent as SpellCheckSolid } from 'assets/svg/spellcheckSolid.svg';
import { ReactComponent as MatchCaseSolid } from 'assets/svg/matchCaseSolid.svg';
import { useAppDispatch } from 'hooks/redux';

import UniqueRowsValues from './uniqueRowsValues/UniqueRowsValues';
import './extendedFilterPanel.scss';

type ExtendedFilterPanelProps = {
  vtdId: string;
  tableType: TableType;
  table: PipelineTable;
  column: PipelineColumn;
};

const ExtendedFilterPanel: React.FC<ExtendedFilterPanelProps> = ({ vtdId, tableType, table, column }) => {
  const dispatch = useAppDispatch();

  const [searchValue, setSearchValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [searchType, setSearchType] = useState(column.extendedFilter.searchType || SEARCH_TYPES.search);
  const [searchCompareTypes, setSearchCompareTypes] = useState<SEARCH_COMPARE_TYPES[]>([]);

  const filteredRowsWithoutSearch = useMemo(() => {
    const columnsWithFilter = table.columns.filter(
      ({ index, extendedFilter }) => index !== column.index && extendedFilter.checkedUniqueRowsValues.length,
    );

    return table.rows.map((row) => {
      if (columnsWithFilter.length)
        return columnsWithFilter.every(({ index, extendedFilter: { checkedUniqueRowsValues } }) =>
          checkedUniqueRowsValues.includes(row.values[index].value),
        )
          ? { ...row, hidden: false }
          : { ...row, hidden: true };

      return { ...row, hidden: false };
    });
  }, [column.index, table.columns, table.rows]);

  const filteredRows = useMemo(() => {
    if (searchType === SEARCH_TYPES.search && searchValue)
      return filteredRowsWithoutSearch.map((row) =>
        !row.hidden && !isSearchComparedCellValue({ cellValue: row.values[column.index].value, searchValue, searchCompareTypes })
          ? { ...row, hidden: true }
          : row,
      );

    if (searchType === SEARCH_TYPES.range && (fromValue || toValue))
      return filteredRowsWithoutSearch.map((row) =>
        !row.hidden && !isRangeComparedCellValue({ cellValue: row.values[column.index].value, fromValue, toValue })
          ? { ...row, hidden: true }
          : row,
      );

    return filteredRowsWithoutSearch;
  }, [filteredRowsWithoutSearch, searchType, searchValue, column.index, searchCompareTypes, fromValue, toValue]);

  const visibleRows = useMemo(() => filteredRows.filter(({ hidden }) => !hidden), [filteredRows]);

  const setCompareTypesOnClick = useCallback(
    (searchCompareType: SEARCH_COMPARE_TYPES) =>
      setSearchCompareTypes((prev) =>
        !prev.includes(searchCompareType) ? [...prev, searchCompareType] : prev.filter((value) => value !== searchCompareType),
      ),
    [],
  );

  const offExtendedFilterOnClick = useCallback(() => {
    dispatch(
      setPipelineTableProperties({
        vtdId,
        tableType,
        properties: {
          rows: filteredRowsWithoutSearch,
        },
      }),
    );

    dispatch(
      setColumnProperties({
        vtdId,
        tableType,
        columnIndex: column.index,
        properties: { extendedFilter: { visible: false, checkedUniqueRowsValues: [] } },
      }),
    );
  }, [dispatch, vtdId, tableType, filteredRowsWithoutSearch, column.index]);

  return (
    <div className="extendedFilterPanel">
      <button
        title="Убрать фильтр"
        className="offExtendedFilter"
        disabled={!column.extendedFilter.checkedUniqueRowsValues.length}
        onClick={offExtendedFilterOnClick}
      >
        <FilterOffSolid />
      </button>
      <div className="searchTypes">
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
      <div className="filterInputs">
        {searchType === SEARCH_TYPES.search ? (
          <div className="searchInput">
            <input
              placeholder={column.extendedFilter.searchValue || 'Поиск'}
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
        ) : (
          searchType === SEARCH_TYPES.range && (
            <div className="rangeInputs">
              <div className="fromInput">
                <input
                  placeholder={column.extendedFilter.fromValue || 'От'}
                  type="search"
                  onChange={(e) => setFromValue(e.target.value)}
                  value={fromValue}
                />
              </div>
              <div className="toInput">
                <input
                  placeholder={column.extendedFilter.toValue || 'До'}
                  type="search"
                  onChange={(e) => setToValue(e.target.value)}
                  value={toValue}
                />
              </div>
            </div>
          )
        )}
      </div>
      <div className="uniqueRowsValuesWrapper">
        {visibleRows.length ? (
          <UniqueRowsValues
            vtdId={vtdId}
            tableType={tableType}
            filteredRows={filteredRows}
            visibleRows={visibleRows}
            filteredRowsWithoutSearch={filteredRowsWithoutSearch}
            column={column}
            searchValue={searchValue}
            fromValue={fromValue}
            toValue={toValue}
            searchType={searchType}
          />
        ) : (
          <div className="noResults">Результаты не найдены</div>
        )}
      </div>
    </div>
  );
};

export default memo(ExtendedFilterPanel);
