import { useCallback, memo } from 'react';
import { VTD_TREE_LEVELS } from 'redux/vtds/constants';
import { VtdTreeLevels } from 'redux/vtds/types';
import './vtdTreeDetails.styles.scss';

type VtdTreeDetailsProps = {
  children?: React.ReactNode;
  header: string;
  level: VTD_TREE_LEVELS;
  levelsExpanded: VtdTreeLevels;
  levelsHeight: VtdTreeLevels;
  setLevelsHeight: React.Dispatch<React.SetStateAction<VtdTreeLevels>>;
};

const VtdTreeDetails: React.FC<VtdTreeDetailsProps> = ({
  children,
  header,
  level,
  levelsExpanded,
  levelsHeight,
  setLevelsHeight,
}) => {
  const setLevelHeightOnTransitionEnd = useCallback(
    () => setLevelsHeight((prev) => ({ ...prev, [level]: 'auto' })),
    [level, setLevelsHeight],
  );

  return (
    <div
      className="details"
      style={{ height: levelsExpanded[level] === header ? levelsHeight[level] : 0 }}
      onTransitionEnd={setLevelHeightOnTransitionEnd}
    >
      {children}
    </div>
  );
};

export default memo(VtdTreeDetails);
