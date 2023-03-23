import { Dispatch, FC, memo, SetStateAction } from 'react';
import { PipelineColumn } from 'redux/vtds/types';

import './rangeInputs.styles.scss';

type RangeInputsProps = {
  column: PipelineColumn;
  fromValue: string;
  toValue: string;
  setFromValue: Dispatch<SetStateAction<string>>;
  setToValue: Dispatch<SetStateAction<string>>;
};

const RangeInputs: FC<RangeInputsProps> = ({ column, fromValue, toValue, setFromValue, setToValue }) => {
  return (
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
  );
};

export default memo(RangeInputs);
