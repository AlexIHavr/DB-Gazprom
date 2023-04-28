import { FC, memo } from 'react';

import { SelectAllButtonProps } from '../../types/props';
import { ReactComponent as CheckBoxBlackRegular } from '../../assets/svg/checkBoxBlankRegular.svg';
import { ReactComponent as CheckBoxRegular } from '../../assets/svg/checkBoxRegular.svg';
import uniqueRowValueStyles from '../../components/uniqueRowValue/uniqueRowValue.module.scss';

import styles from './selectAllButton.module.scss';

const SelectAllButton: FC<SelectAllButtonProps> = ({ uniqueRowsValues, checkedUniqueRowsValues, setCheckedUniqueRowsValues }) => {
  const toggleSelectAllOnClick = () => {
    setCheckedUniqueRowsValues((prev) => (prev.length === uniqueRowsValues.length ? [] : uniqueRowsValues));
  };

  return (
    <div className={uniqueRowValueStyles.uniqueRowValue} onClick={toggleSelectAllOnClick}>
      {checkedUniqueRowsValues.length === uniqueRowsValues.length ? (
        <CheckBoxRegular />
      ) : checkedUniqueRowsValues.length ? (
        <>
          <div className={styles.isSomeCheckedRowsValues}></div>
          <CheckBoxBlackRegular />
        </>
      ) : (
        <CheckBoxBlackRegular />
      )}
      <span>Выделить все</span>
    </div>
  );
};

export default memo(SelectAllButton);
