import { memo, FC, useEffect } from 'react';

import { VtdTreeDetailsProps } from '../../types/props';

import styles from './vtdTreeDetails.module.scss';

const VtdTreeDetails: FC<VtdTreeDetailsProps> = ({ children, level, levelExpanded, levelHeight, setLevelsHeight }) => {
  const setLevelHeightOnTransitionEnd = () => {
    if (levelHeight) setLevelsHeight((prev) => ({ ...prev, [level]: 'auto' }));
  };

  useEffect(() => {
    if (levelExpanded === null && levelHeight) setLevelsHeight((prev) => ({ ...prev, [level]: 0 }));
  }, [level, levelExpanded, levelHeight, setLevelsHeight]);

  return (
    <div className={styles.vtdTreeDetails} style={{ height: levelHeight }} onTransitionEnd={setLevelHeightOnTransitionEnd}>
      {children}
    </div>
  );
};

export default memo(VtdTreeDetails);
