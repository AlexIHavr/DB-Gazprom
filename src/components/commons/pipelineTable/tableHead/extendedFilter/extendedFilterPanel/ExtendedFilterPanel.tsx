import { memo, useCallback, useMemo, useState } from 'react';
import { DataArray, FilterAltOffOutlined, Spellcheck, TextFields } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../../redux/vtdTree/types';
import { getRangeCompareRows, getSearchCompareRows, getSortedRows } from '../../../../../../helpers/pipelineTable';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { setColumnProperties, setPipelineTableProperties } from '../../../../../../redux/vtdTree/reducer';

import { SEARCH_COMPARE_TYPES, SEARCH_COMPARE_TYPES_VALUES, SEARCH_TYPES, SEARCH_TYPES_VALUES } from './constants';
import UniqueRowsValues from './uniqueRowsValues/UniqueRowsValues';

import './extendedFilterPanel.scss';

type ExtendedFilterPanelProps = {
  vtdId: string;
  tableType: PipelineDataTables;
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

  const filteredRows = useMemo(() => {
    const columnsWithFilter = table.columns.filter(
      ({ index, extendedFilter }) => index !== column.index && extendedFilter.checkedUniqueRowsValues.length,
    );

    let filteredRows = table.rows;

    if (columnsWithFilter.length) {
      filteredRows = column.extendedFilter.checkedUniqueRowsValues.length
        ? table.rows.filter((row) =>
            columnsWithFilter.every(({ index, extendedFilter: { checkedUniqueRowsValues } }) => {
              return checkedUniqueRowsValues.includes(row[index]);
            }),
          )
        : table.filteredRows;
    }

    if (searchType === SEARCH_TYPES.search && searchValue)
      return getSearchCompareRows({ rows: filteredRows, columnIndex: column.index, searchValue, searchCompareTypes });

    if (searchType === SEARCH_TYPES.range && (fromValue || toValue))
      return getRangeCompareRows({ rows: filteredRows, columnIndex: column.index, fromValue, toValue });

    return filteredRows;
  }, [
    table.columns,
    table.rows,
    table.filteredRows,
    searchType,
    searchValue,
    column.index,
    column.extendedFilter.checkedUniqueRowsValues.length,
    searchCompareTypes,
    fromValue,
    toValue,
  ]);

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
          filteredRows,
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
  }, [table.columns, table.rows, dispatch, vtdId, tableType, filteredRows, column.index]);

  return (
    <div className="extendedFilterPanel">
      <button
        title="Убрать фильтр"
        className="offExtendedFilter"
        disabled={!column.extendedFilter.checkedUniqueRowsValues.length}
        onClick={offExtendedFilterOnClick}
      >
        <FilterAltOffOutlined />
      </button>
      <div className="searchTypes">
        {SEARCH_TYPES_VALUES.map((searchTypeValue) => (
          <button
            key={searchTypeValue}
            title={searchTypeValue}
            className={classNames({ active: searchType === searchTypeValue })}
            onClick={() => setSearchType(searchTypeValue)}
          >
            {searchTypeValue === SEARCH_TYPES.search ? <SearchIcon /> : <DataArray />}
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
                {searchCompareType === SEARCH_COMPARE_TYPES.withRegistry ? <TextFields /> : <Spellcheck />}
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
