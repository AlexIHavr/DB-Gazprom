import { memo, useCallback, useMemo, useState } from 'react';
import classNames from 'classnames';

import { PipelineColumn, TableType, PipelineTable } from '../../../../../../redux/vtdTree/types';
import { getRangeCompareRows, getSearchCompareRows, getSortedRows } from '../../../../../../helpers/pipelineTable';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { setColumnProperties, setPipelineTableProperties } from '../../../../../../redux/vtdTree/reducer';
import { ReactComponent as FilterOffSolid } from '../../../../../../assets/svg/filterOffSolid.svg';
import { ReactComponent as SearchSolid } from '../../../../../../assets/svg/searchSolid.svg';
import { ReactComponent as ArraySolid } from '../../../../../../assets/svg/arraySolid.svg';
import { ReactComponent as SpellCheckSolid } from '../../../../../../assets/svg/spellcheckSolid.svg';
import { ReactComponent as MatchCaseSolid } from '../../../../../../assets/svg/matchCaseSolid.svg';

import { SEARCH_COMPARE_TYPES, SEARCH_COMPARE_TYPES_VALUES, SEARCH_TYPES, SEARCH_TYPES_VALUES } from './constants';
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
  const [searchType, setSearchType] = useState(
    column.extendedFilter.fromValue || column.extendedFilter.toValue ? SEARCH_TYPES.range : SEARCH_TYPES.search,
  );
  const [searchCompareTypes, setSearchCompareTypes] = useState<SEARCH_COMPARE_TYPES[]>([]);

  const filteredRowsWithoutSearch = useMemo(() => {
    const columnsWithFilter = table.columns.filter(
      ({ index, extendedFilter }) => index !== column.index && extendedFilter.checkedUniqueRowsValues.length,
    );

    if (columnsWithFilter.length) {
      return column.extendedFilter.checkedUniqueRowsValues.length
        ? table.rows.filter((row) =>
            columnsWithFilter.every(({ index, extendedFilter: { checkedUniqueRowsValues } }) =>
              checkedUniqueRowsValues.includes(row[index]),
            ),
          )
        : table.filteredRows;
    }

    return table.rows;
  }, [column.extendedFilter.checkedUniqueRowsValues.length, column.index, table.columns, table.filteredRows, table.rows]);

  const filteredRows = useMemo(() => {
    if (searchType === SEARCH_TYPES.search && searchValue)
      return getSearchCompareRows({
        rows: filteredRowsWithoutSearch,
        columnIndex: column.index,
        searchValue,
        searchCompareTypes,
      });

    if (searchType === SEARCH_TYPES.range && (fromValue || toValue))
      return getRangeCompareRows({ rows: filteredRowsWithoutSearch, columnIndex: column.index, fromValue, toValue });

    return filteredRowsWithoutSearch;
  }, [searchType, searchValue, filteredRowsWithoutSearch, column.index, searchCompareTypes, fromValue, toValue]);

  const setCompareTypesOnClick = useCallback(
    (searchCompareType: SEARCH_COMPARE_TYPES) =>
      setSearchCompareTypes((prev) =>
        !prev.includes(searchCompareType) ? [...prev, searchCompareType] : prev.filter((value) => value !== searchCompareType),
      ),
    [],
  );

  const offExtendedFilterOnClick = useCallback(() => {
    const sortedColumn = table.columns.find(({ sortType }) => sortType !== null);

    dispatch(
      setPipelineTableProperties({
        vtdId,
        tableType,
        properties: {
          filteredRows: filteredRows.length !== table.rows.length ? filteredRowsWithoutSearch : [],
          sortedRows: sortedColumn
            ? getSortedRows({
                sortType: sortedColumn.sortType!,
                columnIndex: sortedColumn.index,
                rows: table.rows,
              })
            : [],
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
  }, [table.columns, table.rows, dispatch, vtdId, tableType, filteredRows.length, filteredRowsWithoutSearch, column.index]);

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
                />
              </div>
              <div className="toInput">
                <input
                  placeholder={column.extendedFilter.toValue || 'До'}
                  type="search"
                  onChange={(e) => setToValue(e.target.value)}
                />
              </div>
            </div>
          )
        )}
      </div>
      <div className="uniqueRowsValuesWrapper">
        {filteredRows.length ? (
          <UniqueRowsValues
            vtdId={vtdId}
            tableType={tableType}
            table={table}
            filteredRows={filteredRows}
            column={column}
            searchValue={searchValue}
            fromValue={fromValue}
            toValue={toValue}
          />
        ) : (
          <div className="noResults">Результаты не найдены</div>
        )}
      </div>
    </div>
  );
};

export default memo(ExtendedFilterPanel);
