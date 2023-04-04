import { FC, memo, MouseEvent, useCallback, useState } from 'react';

import { VTD_TREE_LEVELS } from '../../consts/vtdTreeLevels';
import VtdTreeDetails from '../vtdTreeDetails/vtdTreeDetails.component';
import VtdTreeHeader from '../vtdTreeHeader/vtdTreeHeader.component';
import { VtdTreeRootProps } from '../../types/props';

import './vtdTreeRoot.styles.scss';

const VtdTreeRoot: FC<VtdTreeRootProps> = ({ children, header, level, useH3 }) => {
  const [levelsExpanded, setLevelsExpanded] = useState(VTD_TREE_LEVELS);
  const [levelsHeight, setLevelsHeight] = useState(VTD_TREE_LEVELS);

  const setLevelExpandedOnClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const detailsHeight = Array.from(e.currentTarget.lastElementChild?.children || []).reduce((sum, elem) => {
        sum += (elem as HTMLDivElement).offsetHeight;
        return sum;
      }, 0);
      const newLevel = levelsExpanded[level] !== header ? header : null;

      setLevelsHeight((prev) => ({ ...prev, [level]: detailsHeight }));
      setLevelsExpanded({ ...levelsExpanded, [level]: newLevel });
    },
    [header, level, levelsExpanded],
  );

  return (
    <div className="root" onClick={setLevelExpandedOnClick}>
      <VtdTreeHeader header={header} levelExpanded={levelsExpanded[level]} useH3={useH3} />
      <VtdTreeDetails
        header={header}
        level={level}
        levelsExpanded={levelsExpanded}
        levelsHeight={levelsHeight}
        setLevelsHeight={setLevelsHeight}
      >
        {children}
      </VtdTreeDetails>
    </div>
  );
};

export default memo(VtdTreeRoot);
