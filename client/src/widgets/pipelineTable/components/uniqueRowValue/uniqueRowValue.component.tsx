import { FC, memo, useCallback } from 'react';
import { ExcelValue, UniqueRowsValuesProps } from 'redux/vtds/types';

import { ReactComponent as CheckBoxBlackRegular } from '../../assets/svg/checkBoxBlankRegular.svg';
import { ReactComponent as CheckBoxRegular } from '../../assets/svg/checkBoxRegular.svg';

import './uniqueRowValue.styles.scss';

type UniqueRowValueProps = Omit<UniqueRowsValuesProps, 'uniqueRowsValues'> & {
  uniqueRowValue: ExcelValue;
};

const UniqueRowValue: FC<UniqueRowValueProps> = ({ uniqueRowValue, checkedUniqueRowsValues, setCheckedUniqueRowsValues }) => {
  const toggleCheckedUniqueRowValueOnClick = useCallback(
    (rowValue: ExcelValue) =>
      setCheckedUniqueRowsValues((prev) =>
        prev.includes(rowValue) ? prev.filter((value) => value !== rowValue) : [...prev, rowValue],
      ),
    [setCheckedUniqueRowsValues],
  );

  return (
    <div className="uniqueRowValue" onClick={() => toggleCheckedUniqueRowValueOnClick(uniqueRowValue)}>
      {checkedUniqueRowsValues.includes(uniqueRowValue) ? <CheckBoxRegular /> : <CheckBoxBlackRegular />}
      <span>{uniqueRowValue === null ? '(Пустые)' : uniqueRowValue}</span>
    </div>
  );
};

export default memo(UniqueRowValue);
