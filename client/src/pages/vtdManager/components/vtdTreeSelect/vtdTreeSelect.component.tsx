import { FC, memo } from 'react';

import { VtdTreeSelectProps } from '../../types/props';

import styles from './vtdTreeSelect.module.scss';
import { VTD_TREE_LEVELS_KEYS, VTD_TREE_LEVEL_NAMES } from './../../../vtdTree/consts/vtdTreeLevels';
import { getVtdTreeChildren } from './../../helpers/getVtdTreeChildren';
import useVtdTreeStore from './../../../vtdTree/vtdTree.store';

const VtdTreeSelect: FC<VtdTreeSelectProps> = ({ selectValues, setSelectValues }) => {
  const vtdTree = useVtdTreeStore((state) => state.vtdTree);

  const setSelectValuesOnBlur = (e: React.FocusEvent<HTMLInputElement>, selectIndex: number) => {
    setSelectValues((prev) => {
      const newPrev = [...prev];
      newPrev[selectIndex] = e.target.value;
      return newPrev;
    });
  };

  return (
    <>
      {VTD_TREE_LEVELS_KEYS.map((levelName, selectIndex) => (
        <div key={levelName} className={styles.vtdTreeSelect}>
          <h2>{VTD_TREE_LEVEL_NAMES[levelName]}</h2>

          <input
            name={levelName}
            list={`${levelName}List`}
            onBlur={(e) => setSelectValuesOnBlur(e, selectIndex)}
            type="text"
            required
          />

          <datalist id={`${levelName}List`}>
            {getVtdTreeChildren({ vtdTree, selectValues, selectIndex }).map(({ header }) => (
              <option key={header}>{header}</option>
            ))}
          </datalist>
        </div>
      ))}
    </>
  );
};

export default memo(VtdTreeSelect);
