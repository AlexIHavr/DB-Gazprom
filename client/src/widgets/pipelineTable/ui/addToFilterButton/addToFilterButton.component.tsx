import { FC, memo } from 'react';
import classNames from 'classnames';

import { AddToFilterButtonProps } from '../../types/props';
import { ReactComponent as CheckBoxBlackRegular } from '../../assets/svg/checkBoxBlankRegular.svg';
import { ReactComponent as CheckBoxRegular } from '../../assets/svg/checkBoxRegular.svg';
import uniqueRowValueStyles from '../../components/uniqueRowValue/uniqueRowValue.module.scss';

import styles from './addToFilterButton.module.scss';

const AddToFilterButton: FC<AddToFilterButtonProps> = ({ isAddToFilter, setIsAddToFilter }) => {
  return (
    <div
      className={classNames(uniqueRowValueStyles.uniqueRowValue, styles.addToFilterButton)}
      onClick={() => setIsAddToFilter((prev) => !prev)}
    >
      {isAddToFilter ? <CheckBoxRegular /> : <CheckBoxBlackRegular />}
      <span>Добавить в фильтр</span>
    </div>
  );
};

export default memo(AddToFilterButton);
