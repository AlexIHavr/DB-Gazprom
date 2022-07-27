import classNames from 'classnames';
import SearchIcon from '@mui/icons-material/Search';
import {
  BrowserNotSupported,
  CheckBoxOutlineBlankOutlined,
  CheckBoxOutlined,
  Crop32Outlined,
  DataArray,
  Spellcheck,
  TextFields,
} from '@mui/icons-material';
import { IconButton, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGreaterThan, faGreaterThanEqual, faLessThan, faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

import { PipelineColumn, PipelineDataTables, PipelineTable } from '../../../../../../redux/vtdTree/types';
import { SEARCH_TYPES } from '../../../../../../redux/vtdTree/constants';

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
            <SearchType
              title="Поиск"
              type={SEARCH_TYPES.search}
              icon={<SearchIcon />}
              vtdId={vtdId}
              tableType={tableType}
              column={column}
            />
            <SearchType
              title="Поиск в диапазоне"
              type={SEARCH_TYPES.range}
              icon={<DataArray />}
              vtdId={vtdId}
              tableType={tableType}
              column={column}
            />
            <SearchType
              title="Поиск всех не пустых значений"
              type={SEARCH_TYPES.notEmpty}
              icon={<BrowserNotSupported />}
              vtdId={vtdId}
              tableType={tableType}
              column={column}
            />
            <SearchType
              title="Поиск всех пустых значений"
              type={SEARCH_TYPES.empty}
              icon={<Crop32Outlined />}
              vtdId={vtdId}
              tableType={tableType}
              column={column}
            />
          </div>
          <div className="filterInputs">
            <div className="searchInput">
              <TextField label="Поиск" size="small" type="search" />
              <IconButton>
                <TextFields />
              </IconButton>
              <IconButton>
                <Spellcheck />
              </IconButton>
            </div>
            <div className="rangeInputs">
              <div className="fromInput">
                <TextField label="От" size="small" type="search" />
                <IconButton>
                  <FontAwesomeIcon icon={faGreaterThan} />
                </IconButton>
                <IconButton>
                  <FontAwesomeIcon icon={faGreaterThanEqual} />
                </IconButton>
                <IconButton>
                  <FontAwesomeIcon icon={faLessThan} />
                </IconButton>
                <IconButton>
                  <FontAwesomeIcon icon={faLessThanEqual} />
                </IconButton>
              </div>
              <div className="toInput">
                <TextField label="До" size="small" type="search" />
                <IconButton>
                  <FontAwesomeIcon icon={faGreaterThan} />
                </IconButton>
                <IconButton>
                  <FontAwesomeIcon icon={faGreaterThanEqual} />
                </IconButton>
                <IconButton>
                  <FontAwesomeIcon icon={faLessThan} />
                </IconButton>
                <IconButton>
                  <FontAwesomeIcon icon={faLessThanEqual} />
                </IconButton>
              </div>
            </div>
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
