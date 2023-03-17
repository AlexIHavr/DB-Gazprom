import { memo, useCallback, useState } from 'react';
import { VTD_TREE_LEVELS } from 'redux/vtds/constants';

import VtdTreeDetails from '../vtdTreeDetails/vtdTreeDetails.component';
import VtdTreeHeader from '../vtdTreeHeader/vtdTreeHeader.component';

import './vtdTreeRoot.styles.scss';

type VtdTreeRootProps = {
  children?: React.ReactNode;
  header: string;
  level: VTD_TREE_LEVELS;
  useH3?: boolean;
};

const VtdTreeRoot: React.FC<VtdTreeRootProps> = ({ children, header, level, useH3 }) => {
  const [levelsExpanded, setLevelsExpanded] = useState(VTD_TREE_LEVELS);
  const [levelsHeight, setLevelsHeight] = useState(VTD_TREE_LEVELS);

  const setLevelExpandedOnClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      const detailsHeight = Array.from(e.currentTarget.lastElementChild?.children || []).reduce((sum, elem) => {
        sum += (elem as HTMLDivElement).offsetHeight;
        return sum;
      }, 0);
      const newLevel = levelsExpanded[level] !== header ? header : null;

      setLevelsHeight((prev) => ({ ...prev, [level]: detailsHeight }));
      setLevelsExpanded({ ...levelsExpanded, [level]: newLevel });
    },
    [header, level, levelsExpanded, setLevelsExpanded, setLevelsHeight],
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
