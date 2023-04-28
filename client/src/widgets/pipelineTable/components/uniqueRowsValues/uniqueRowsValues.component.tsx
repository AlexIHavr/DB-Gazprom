import { FC, memo, UIEvent, useLayoutEffect, useMemo, useRef, useState } from 'react';

import { UniqueRowsValuesProps } from '../../types/props';
import UniqueRowValue from '../uniqueRowValue/uniqueRowValue.component';

import { UNIQUE_ROW_HEIGHT } from './../../consts/tableSettings';
import styles from './uniqueRowsValues.module.scss';

const UniqueRowsValues: FC<UniqueRowsValuesProps> = ({
  uniqueRowsValues,
  checkedUniqueRowsValues,
  columnCheckedUniqueRowsValues,
  setCheckedUniqueRowsValues,
  inputValue,
}) => {
  const [uniqueRowValueIndex, setUniqueRowsValueIndex] = useState(0);
  const [visibleCountUniqueRowsValues, setVisibleCountUniqueRowsValues] = useState(0);

  const uniqueRowsValuesRef = useRef<HTMLDivElement>(null);

  const uniqueRowsValuesContentStyle = useMemo(
    () => ({
      height: (uniqueRowsValues.length + 1) * UNIQUE_ROW_HEIGHT,
    }),
    [uniqueRowsValues.length],
  );

  const uniqueRowsValuesOnDisplay = useMemo(
    () => uniqueRowsValues.slice(uniqueRowValueIndex, uniqueRowValueIndex + visibleCountUniqueRowsValues),
    [uniqueRowValueIndex, uniqueRowsValues, visibleCountUniqueRowsValues],
  );

  const uniqueRowsValuesOnScroll = (e: UIEvent<HTMLDivElement>) => {
    const newUniqueRowValueIndex = Math.floor(e.currentTarget.scrollTop / UNIQUE_ROW_HEIGHT);
    if (uniqueRowValueIndex !== newUniqueRowValueIndex) setUniqueRowsValueIndex(newUniqueRowValueIndex);

    const uniqueRowsValuesOnDisplay = e.currentTarget.firstChild!.firstChild as HTMLDivElement;
    uniqueRowsValuesOnDisplay.style.top = e.currentTarget.scrollTop + 'px';
  };

  useLayoutEffect(() => {
    setVisibleCountUniqueRowsValues(Math.ceil(uniqueRowsValuesRef.current!.offsetHeight / UNIQUE_ROW_HEIGHT) - 1);

    setCheckedUniqueRowsValues(
      !columnCheckedUniqueRowsValues.length || inputValue
        ? uniqueRowsValues
        : uniqueRowsValues.filter((value) => columnCheckedUniqueRowsValues.includes(value)),
    );
  }, [columnCheckedUniqueRowsValues, inputValue, setCheckedUniqueRowsValues, uniqueRowsValues]);

  return (
    <div className={styles.uniqueRowsValues} onScroll={uniqueRowsValuesOnScroll} ref={uniqueRowsValuesRef}>
      <div className={styles.uniqueRowsValuesContent} style={uniqueRowsValuesContentStyle}>
        <div className={styles.uniqueRowsValuesOnDisplay}>
          {uniqueRowsValuesOnDisplay.map((uniqueRowValue, i) => (
            <UniqueRowValue
              key={i}
              uniqueRowValue={uniqueRowValue}
              checkedUniqueRowsValues={checkedUniqueRowsValues}
              setCheckedUniqueRowsValues={setCheckedUniqueRowsValues}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(UniqueRowsValues);
