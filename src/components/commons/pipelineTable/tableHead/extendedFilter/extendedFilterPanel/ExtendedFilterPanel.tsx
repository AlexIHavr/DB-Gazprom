import classNames from 'classnames';
import { CheckBoxOutlineBlankOutlined, CheckBoxOutlined, Spellcheck, TextFields } from '@mui/icons-material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faGreaterThanEqual, faLessThan, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../../redux/vtdTree/types';
import { SEARCH_TYPES, SEARCH_TYPES_VALUES } from '../../../../../../redux/vtdTree/constants';

import SearchType from './searchType/SearchType';

import './extendedFilterPanel.scss';

type ExtendedFilterPanelProps = {
  vtdId: string;
  tableType: PipelineDataTables;
  table: PipelineTable;
  column: PipelineColumn;
};

const ExtendedFilterPanel: React.FC<ExtendedFilterPanelProps> = ({ vtdId, tableType, table, column }) => {
  return (
    <div
      className={classNames('extendedFilterPanel', { visibleExtendedFilter: column.extendedFilter.visible })}
      onClick={(e) => e.stopPropagation()}
    >
      {column.extendedFilter.visible && (
        <>
          <div className="searchTypes">
            {SEARCH_TYPES_VALUES.map((searchType) => (
              <SearchType key={searchType} searchType={searchType} vtdId={vtdId} tableType={tableType} column={column} />
            ))}
          </div>
          <div className="filterInputs">
            {column.extendedFilter.searchType === SEARCH_TYPES.search ? (
              <div className="searchInput">
                <input placeholder="Поиск" type="search" />
                <button>
                  <TextFields />
                </button>
                <button>
                  <Spellcheck />
                </button>
              </div>
            ) : (
              column.extendedFilter.searchType === SEARCH_TYPES.range && (
                <div className="rangeInputs">
                  <div className="fromInput">
                    <input placeholder="От" type="search" />
                    <button>
                      <FontAwesomeIcon icon={faGreaterThan} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faGreaterThanEqual} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faLessThan} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faLessThanEqual} />
                    </button>
                  </div>
                  <div className="toInput">
                    <input placeholder="До" type="search" />
                    <button>
                      <FontAwesomeIcon icon={faGreaterThan} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faGreaterThanEqual} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faLessThan} />
                    </button>
                    <button>
                      <FontAwesomeIcon icon={faLessThanEqual} />
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="uniqueFilteredRows">
            <div>
              <CheckBoxOutlineBlankOutlined />
              <span className="selectAll">Выделить все</span>
            </div>
            <div>
              <CheckBoxOutlineBlankOutlined />
              <span>111111111111111111111</span>
            </div>
            <div>
              <CheckBoxOutlined />
              <span>222222222222222222222</span>
            </div>
            <div>
              <CheckBoxOutlined />
              <span>222222222222222222222</span>
            </div>
            <div>
              <CheckBoxOutlined />
              <span>222222222222222222222</span>
            </div>
            <div>
              <CheckBoxOutlined />
              <span>
                222222222222222222222 222222222222222222222 222222222222222222222 222222222222222222222 222222222222222222222
                222222222222222222222
              </span>
            </div>
            <div>
              <CheckBoxOutlined />
              <span>222222222222222222222</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ExtendedFilterPanel;
