import { memo, useCallback, useMemo, useState } from 'react';
import { DataArray, FilterAltOffOutlined, Spellcheck, TextFields } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames';

import { ExcelRow, PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../../redux/vtdTree/types';
import { getRangeCompareRows, getSearchCompareRows } from '../../../../../../helpers/pipelineTable';
import { useAppDispatch } from '../../../../../../hooks/redux';
import { setColumnProperties, setSortedRows } from '../../../../../../redux/vtdTree/reducer';

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

  const [searchType, setSearchType] = useState(SEARCH_TYPES.search);
  const [searchValue, setSearchValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [searchCompareTypes, setSearchCompareTypes] = useState<SEARCH_COMPARE_TYPES[]>([]);
  const [checkedUniqueRowsValues, setCheckedUniqueRowsValues] = useState<ExcelRow>([]);

  const foundedRows = useMemo(() => {
    let sortedRows = table.sortedRows;
    if (column.extendedFilter.prevFilteredRows.length) sortedRows = column.extendedFilter.prevFilteredRows;

    if (searchType === SEARCH_TYPES.search && searchValue)
      return getSearchCompareRows({ rows: sortedRows, columnIndex: column.index, searchValue, searchCompareTypes });

    if (searchType === SEARCH_TYPES.range && (fromValue || toValue))
      return getRangeCompareRows({ rows: sortedRows, columnIndex: column.index, fromValue, toValue });

    return sortedRows;
  }, [
    column.extendedFilter.prevFilteredRows,
    column.index,
    fromValue,
    searchCompareTypes,
    searchType,
    searchValue,
    table.sortedRows,
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
    dispatch(setSortedRows({ vtdId, tableType, sortedRows: column.extendedFilter.prevFilteredRows }));

    dispatch(
      setColumnProperties({
        vtdId,
        tableType,
        columnIndex: column.index,
        properties: { extendedFilter: { visible: false, prevFilteredRows: [], checkedUniqueRowsValues: [] } },
      }),
    );
  }, [column.extendedFilter.prevFilteredRows, column.index, dispatch, tableType, vtdId]);

  const applyExtendedFilterOnClick = useCallback(() => {
    const newSortedRows = foundedRows.filter((row) => checkedUniqueRowsValues.includes(row[column.index]));

    dispatch(setSortedRows({ vtdId, tableType, sortedRows: newSortedRows }));

    table.columns.forEach(({ extendedFilter, index }) => {
      if (extendedFilter.prevFilteredRows.length && index !== column.index)
        dispatch(
          setColumnProperties({
            vtdId,
            tableType,
            columnIndex: index,
            properties: { extendedFilter: { visible: false, prevFilteredRows: newSortedRows, checkedUniqueRowsValues: [] } },
          }),
        );
    });

    dispatch(
      setColumnProperties({
        vtdId,
        tableType,
        columnIndex: column.index,
        properties: {
          extendedFilter: {
            visible: false,
            prevFilteredRows: !column.extendedFilter.prevFilteredRows.length
              ? table.sortedRows
              : column.extendedFilter.prevFilteredRows,
            checkedUniqueRowsValues,
          },
        },
      }),
    );
  }, [
    foundedRows,
    dispatch,
    vtdId,
    tableType,
    table.columns,
    table.sortedRows,
    column.index,
    column.extendedFilter.prevFilteredRows,
    checkedUniqueRowsValues,
  ]);

  return (
    <div className="extendedFilterPanel">
      <button
        title="Убрать фильтр"
        className="offExtendedFilter"
        disabled={!column.extendedFilter.prevFilteredRows.length}
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
            <input placeholder="Поиск" type="search" onChange={(e) => setSearchValue(e.target.value)} />
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
                <input placeholder="От" type="search" onChange={(e) => setFromValue(e.target.value)} />
              </div>
              <div className="toInput">
                <input placeholder="До" type="search" onChange={(e) => setToValue(e.target.value)} />
              </div>
            </div>
          )
        )}
      </div>
      <div className="uniqueRowsValuesWrapper">
        {foundedRows.length ? (
          <UniqueRowsValues
            rows={foundedRows}
            column={column}
            checkedUniqueRowsValues={checkedUniqueRowsValues}
            setCheckedUniqueRowsValues={setCheckedUniqueRowsValues}
          />
        ) : (
          <div className="noResults">Результаты не найдены</div>
        )}
      </div>
      <button
        className="apply"
        onClick={applyExtendedFilterOnClick}
        disabled={!checkedUniqueRowsValues.length || !foundedRows.length}
      >
        ОК
      </button>
    </div>
  );
};

export default memo(ExtendedFilterPanel);
