import { FC, memo } from 'react';

import { AddToFilterButtonProps } from '../../types/props';
import { ReactComponent as CheckBoxBlackRegular } from '../../assets/svg/checkBoxBlankRegular.svg';
import { ReactComponent as CheckBoxRegular } from '../../assets/svg/checkBoxRegular.svg';

import './addToFilterButton.styles.scss';

const AddToFilterButton: FC<AddToFilterButtonProps> = ({ isAddToFilter, setIsAddToFilter }) => {
  return (
    <div className="uniqueRowValue addToFilterButton" onClick={() => setIsAddToFilter((prev) => !prev)}>
      {isAddToFilter ? <CheckBoxRegular /> : <CheckBoxBlackRegular />}
      <span>Добавить в фильтр</span>
    </div>
  );
};

export default memo(AddToFilterButton);
