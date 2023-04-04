import { FC, memo, useCallback } from 'react';

import { SelectAllButtonProps } from '../../types/props';
import { ReactComponent as CheckBoxBlackRegular } from '../../assets/svg/checkBoxBlankRegular.svg';
import { ReactComponent as CheckBoxRegular } from '../../assets/svg/checkBoxRegular.svg';

import './selectAllButton.styles.scss';

const SelectAllButton: FC<SelectAllButtonProps> = ({ uniqueRowsValues, checkedUniqueRowsValues, setCheckedUniqueRowsValues }) => {
  const toggleSelectAllOnClick = useCallback(
    () => setCheckedUniqueRowsValues((prev) => (prev.length === uniqueRowsValues.length ? [] : uniqueRowsValues)),
    [setCheckedUniqueRowsValues, uniqueRowsValues],
  );

  return (
    <div className="uniqueRowValue selectAllButton" onClick={toggleSelectAllOnClick}>
      {checkedUniqueRowsValues.length === uniqueRowsValues.length ? (
        <CheckBoxRegular />
      ) : checkedUniqueRowsValues.length ? (
        <>
          <div className="isSomeCheckedRowsValues"></div>
          <CheckBoxBlackRegular />
        </>
      ) : (
        <CheckBoxBlackRegular />
      )}
      <span className="selectAll">Выделить все</span>
    </div>
  );
};

export default memo(SelectAllButton);
