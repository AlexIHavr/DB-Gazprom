import { FC, memo, useCallback } from 'react';

import { UniqueRowValueProps } from '../../types/props';
import { ReactComponent as CheckBoxBlackRegular } from '../../assets/svg/checkBoxBlankRegular.svg';
import { ReactComponent as CheckBoxRegular } from '../../assets/svg/checkBoxRegular.svg';
import { ExcelValue } from '../../types/pipelineTable';

import styles from './uniqueRowValue.module.scss';

const UniqueRowValue: FC<UniqueRowValueProps> = ({ uniqueRowValue, checkedUniqueRowsValues, setCheckedUniqueRowsValues }) => {
  const toggleCheckedUniqueRowValueOnClick = useCallback(
    (rowValue: ExcelValue) =>
      setCheckedUniqueRowsValues((prev) =>
        prev.includes(rowValue) ? prev.filter((value) => value !== rowValue) : [...prev, rowValue],
      ),
    [setCheckedUniqueRowsValues],
  );

  return (
    <div className={styles.uniqueRowValue} onClick={() => toggleCheckedUniqueRowValueOnClick(uniqueRowValue)}>
      {checkedUniqueRowsValues.includes(uniqueRowValue) ? <CheckBoxRegular /> : <CheckBoxBlackRegular />}
      <span>{uniqueRowValue === null ? '(Пустые)' : uniqueRowValue}</span>
    </div>
  );
};

export default memo(UniqueRowValue);
