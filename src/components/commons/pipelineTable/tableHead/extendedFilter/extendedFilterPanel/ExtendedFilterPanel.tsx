import { memo, useCallback, useMemo, useState } from 'react';
import { DataArray, Spellcheck, TextFields } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import classNames from 'classnames';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../../redux/vtdTree/types';
import { getRangeCompareRows, getSearchCompareRows } from '../../../../../../helpers/pipelineTable';

import UniqueRows from './uniqueRows/UniqueRows';
import { SEARCH_COMPARE_TYPES, SEARCH_COMPARE_TYPES_VALUES, SEARCH_TYPES, SEARCH_TYPES_VALUES } from './constants';

import './extendedFilterPanel.scss';

type ExtendedFilterPanelProps = {
  vtdId: string;
  tableType: PipelineDataTables;
  table: PipelineTable;
  column: PipelineColumn;
};

const ExtendedFilterPanel: React.FC<ExtendedFilterPanelProps> = ({ vtdId, tableType, table, column }) => {
  const [searchType, setSearchType] = useState(SEARCH_TYPES.search);
  const [searchValue, setSearchValue] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [searchCompareTypes, setSearchCompareTypes] = useState<SEARCH_COMPARE_TYPES[]>([]);

  const foundedRows = useMemo(() => {
    if (searchType === SEARCH_TYPES.search && searchValue)
      return getSearchCompareRows({ rows: table.sortedRows, columnIndex: column.index, searchValue, searchCompareTypes });

    if (searchType === SEARCH_TYPES.range && (fromValue || toValue))
      return getRangeCompareRows({ rows: table.sortedRows, columnIndex: column.index, fromValue, toValue });

    return table.sortedRows;
  }, [column.index, fromValue, searchCompareTypes, searchType, searchValue, table.sortedRows, toValue]);

  const setCompareTypesOnClick = useCallback(
    (searchCompareType: SEARCH_COMPARE_TYPES) =>
      setSearchCompareTypes((prev) =>
        !prev.includes(searchCompareType) ? [...prev, searchCompareType] : prev.filter((value) => value !== searchCompareType),
      ),
    [],
  );

  return (
    <div className="extendedFilterPanel">
      <>
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
        <div className="uniqueRowsWrapper">
          {foundedRows.length ? (
            <UniqueRows rows={foundedRows} column={column} />
          ) : (
            <div className="noResults">Результаты не найдены</div>
          )}
        </div>
      </>
    </div>
  );
};

export default memo(ExtendedFilterPanel);
