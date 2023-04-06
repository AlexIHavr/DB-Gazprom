import { useCallback, memo, FC } from 'react';

import { VtdTreeDetailsProps } from '../../types/props';

import styles from './vtdTreeDetails.module.scss';

const VtdTreeDetails: FC<VtdTreeDetailsProps> = ({ children, header, level, levelsExpanded, levelsHeight, setLevelsHeight }) => {
  const setLevelHeightOnTransitionEnd = useCallback(
    () => setLevelsHeight((prev) => ({ ...prev, [level]: 'auto' })),
    [level, setLevelsHeight],
  );

  return (
    <div
      className={styles.vtdTreeDetails}
      style={{ height: levelsExpanded[level] === header ? levelsHeight[level] : 0 }}
      onTransitionEnd={setLevelHeightOnTransitionEnd}
    >
      {children}
    </div>
  );
};

export default memo(VtdTreeDetails);
