import { FC, memo, MouseEvent, useState } from 'react';
import classNames from 'classnames';

import { VTD_TREE_LEVELS } from '../../consts/vtdTreeLevels';
import VtdTreeDetails from '../vtdTreeDetails/vtdTreeDetails.component';
import VtdTreeHeader from '../vtdTreeHeader/vtdTreeHeader.component';
import { VtdTreeRootProps } from '../../types/props';

import styles from './vtdTreeRoot.module.scss';

const VtdTreeRoot: FC<VtdTreeRootProps> = ({ children, header, level, useH3 }) => {
  const [levelsExpanded, setLevelsExpanded] = useState(VTD_TREE_LEVELS);
  const [levelsHeight, setLevelsHeight] = useState(VTD_TREE_LEVELS);

  const setLevelExpandedOnClick = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    const detailsHeight = Array.from(e.currentTarget.lastElementChild?.children || []).reduce((sum, elem) => {
      sum += (elem as HTMLDivElement).offsetHeight;
      return sum;
    }, 0);
    const newLevel = levelsExpanded[level] !== header ? header : null;

    setLevelsHeight((prev) => ({ ...prev, [level]: detailsHeight }));
    setLevelsExpanded({ ...levelsExpanded, [level]: newLevel });
  };

  return (
    <div className={classNames(styles.vtdTreeRoot, { [styles.vtdTreeRootMain]: useH3 })} onClick={setLevelExpandedOnClick}>
      <VtdTreeHeader header={header} levelExpanded={levelsExpanded[level]} useH3={useH3} />
      <VtdTreeDetails
        level={level}
        levelExpanded={levelsExpanded[level]}
        levelHeight={levelsHeight[level]}
        setLevelsHeight={setLevelsHeight}
      >
        {children}
      </VtdTreeDetails>
    </div>
  );
};

export default memo(VtdTreeRoot);
