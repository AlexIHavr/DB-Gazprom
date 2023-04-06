import { FC, memo } from 'react';

import { RANGE_SEARCH_TYPES } from '../../consts/searchSettings';
import { RangeInputsProps } from '../../types/props';

import styles from './rangeInputs.module.scss';

const RangeInputs: FC<RangeInputsProps> = ({ columnFromValue, columnToValue, fromValue, toValue, setFromValue, setToValue }) => {
  return (
    <div className={styles.rangeInputs}>
      <div className={styles.fromInput}>
        <input
          placeholder={columnFromValue || RANGE_SEARCH_TYPES.from}
          type="search"
          onChange={(e) => setFromValue(e.target.value)}
          value={fromValue}
        />
      </div>
      <div>
        <input
          placeholder={columnToValue || RANGE_SEARCH_TYPES.to}
          type="search"
          onChange={(e) => setToValue(e.target.value)}
          value={toValue}
        />
      </div>
    </div>
  );
};

export default memo(RangeInputs);
