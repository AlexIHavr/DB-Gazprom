import { CSSProperties, Dispatch, ReactNode, SetStateAction } from 'react';

import { SEARCH_TYPES, SORT_TYPES } from '../consts/searchSettings';

import {
  ExcelRow,
  ExcelValue,
  ExtendedFilter,
  PipelineCells,
  PipelineColumn,
  PipelineColumns,
  PipelineProperties,
  PipelineRows,
  PipelineTable,
  SearchCompareTypesValues,
} from './pipelineTable';

//components
export type TableManagePanelProps = { table: PipelineTable };
export type PipelineTableProps = TableManagePanelProps & { height?: number; width?: number };

export type TableWrapperProps = TableManagePanelProps & {
  columnsOnPage: PipelineColumns;
  rowsOnPage: PipelineRows;
  style?: CSSProperties;
};

export type TableRowProps = {
  cells: PipelineCells;
  columnsOnPage: PipelineColumns;
};

export type TableHeaderProps = TableManagePanelProps & { column: PipelineColumn };

export type ExtendedFilterProps = TableManagePanelProps & {
  index: number;
  extendedFilter: ExtendedFilter;
};

export type SearchTypeContentProps = {
  children?: ReactNode[];
  searchType: SEARCH_TYPES;
};

export type UniqueRowsProps = PipelineProperties & {
  index: number;
  columnCheckedUniqueRowsValues: ExcelRow;
  filteredRows: PipelineRows;
  searchValue: string;
  fromValue: string;
  toValue: string;
  searchType: SEARCH_TYPES;
  searchCompareTypes: SearchCompareTypesValues;
};

export type UniqueRowValueProps = {
  checkedUniqueRowsValues: ExcelRow;
  setCheckedUniqueRowsValues: React.Dispatch<React.SetStateAction<ExcelRow>>;
  uniqueRowValue: ExcelValue;
};

export type UniqueRowsValuesProps = Omit<UniqueRowValueProps, 'uniqueRowValue'> & {
  uniqueRowsValues: ExcelRow;
  columnCheckedUniqueRowsValues: ExcelRow;
  inputValue: string;
};

//ui
export type ShowColumnsButtonProps = PipelineProperties & { columns: PipelineColumns };

export type HiddenColumnsManagerProps = PipelineProperties & {
  hiddenColumns: PipelineColumns;
  showHiddenColumns: boolean;
  setShowVisiblyColumns: Dispatch<SetStateAction<boolean>>;
};

export type ChangeSizeToolProps = PipelineProperties & {
  index: number;
  width: number;
  minWidth: number;
};

export type HideColumnButtonProps = PipelineProperties & { index: number };
export type SortColumnButtonProps = TableManagePanelProps & { index: number; sortType: SORT_TYPES };

export type ExtendedFilterButtonProps = PipelineProperties &
  Omit<ExtendedFilterProps, 'table'> & {
    columns: PipelineColumns;
    setRightDirection: Dispatch<SetStateAction<boolean>>;
  };

export type OffExtendedFilterButtonProps = PipelineProperties & {
  index: number;
  disabled: boolean;
  filteredRows: PipelineRows;
};

export type SelectSearchTypesProps = {
  searchType: SEARCH_TYPES;
  setSearchType: Dispatch<SetStateAction<SEARCH_TYPES>>;
};

export type SearchInputsProps = {
  columnSearchValue?: string;
  searchValue: string;
  searchCompareTypes: SearchCompareTypesValues;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setSearchCompareTypes: Dispatch<SetStateAction<SearchCompareTypesValues>>;
};

export type RangeInputsProps = {
  columnFromValue?: string;
  columnToValue?: string;
  fromValue: string;
  toValue: string;
  setFromValue: Dispatch<SetStateAction<string>>;
  setToValue: Dispatch<SetStateAction<string>>;
};

export type AddToFilterButtonProps = {
  isAddToFilter: boolean;
  setIsAddToFilter: Dispatch<SetStateAction<boolean>>;
};

export type SelectAllButtonProps = Omit<UniqueRowsValuesProps, 'columnCheckedUniqueRowsValues' | 'inputValue'>;

export type ApplyExtendedFilterButtonProps = PipelineProperties &
  Omit<UniqueRowsProps, 'searchCompareTypes'> &
  Omit<SelectAllButtonProps, 'setCheckedUniqueRowsValues'> & {
    isAddToFilter: boolean;
  };
